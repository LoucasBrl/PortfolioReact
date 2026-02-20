import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { knowledgeNodes, knowledgeLinks } from '../data/knowledge';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

// Material cache for better performance
const nodeMaterials = {
  root: new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    roughness: 0,
    metalness: 1,
    clearcoat: 1,
    transparent: true,
    opacity: 1
  }),
  // OSINT - Cyan/Blue
  osint: new THREE.MeshPhysicalMaterial({ color: 0x00ffff, emissive: 0x0088ff, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.9 }),
  osint_tech: new THREE.MeshPhysicalMaterial({ color: 0x00cccc, roughness: 0.4, metalness: 0.5, transparent: true, opacity: 0.8 }),
  osint_tool: new THREE.MeshPhysicalMaterial({ color: 0x009999, roughness: 0.5, metalness: 0.3, transparent: true, opacity: 0.7 }),

  // NETWORK - Green
  network: new THREE.MeshPhysicalMaterial({ color: 0x00ff00, emissive: 0x003300, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.9 }),
  network_tool: new THREE.MeshPhysicalMaterial({ color: 0x33cc33, roughness: 0.4, metalness: 0.5, transparent: true, opacity: 0.8 }),

  // PENTEST - Red
  pentest: new THREE.MeshPhysicalMaterial({ color: 0xff0000, emissive: 0x660000, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.9 }),
  pentest_tech: new THREE.MeshPhysicalMaterial({ color: 0xcc3333, roughness: 0.4, metalness: 0.5, transparent: true, opacity: 0.8 }),

  // TOOLS - Gray/Silver
  tools: new THREE.MeshPhysicalMaterial({ color: 0xaaaaaa, emissive: 0x222222, roughness: 0.3, metalness: 0.9, transparent: true, opacity: 0.9 }),
  tools_framework: new THREE.MeshPhysicalMaterial({ color: 0x888888, roughness: 0.4, metalness: 0.7, transparent: true, opacity: 0.8 }),
  tools_detail: new THREE.MeshPhysicalMaterial({ color: 0x666666, roughness: 0.5, metalness: 0.5, transparent: true, opacity: 0.7 }),

  // BURP - Orange
  burp: new THREE.MeshPhysicalMaterial({ color: 0xff6600, emissive: 0xff4400, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.9 }),
  burp_module: new THREE.MeshPhysicalMaterial({ color: 0xff8833, roughness: 0.4, metalness: 0.5, transparent: true, opacity: 0.8 }),

  // CRYPTO - Gold/Yellow
  crypto: new THREE.MeshPhysicalMaterial({ color: 0xffd700, emissive: 0xdaa520, roughness: 0.2, metalness: 1.0, transparent: true, opacity: 0.9 }),
  crypto_tech: new THREE.MeshPhysicalMaterial({ color: 0xffcc00, roughness: 0.4, metalness: 0.7, transparent: true, opacity: 0.8 }),
  crypto_tool: new THREE.MeshPhysicalMaterial({ color: 0xccaa00, roughness: 0.5, metalness: 0.5, transparent: true, opacity: 0.7 }),

  // WEB - Purple/Indigo
  web: new THREE.MeshPhysicalMaterial({ color: 0x8a2be2, emissive: 0x4b0082, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.9 }),
  web_tech: new THREE.MeshPhysicalMaterial({ color: 0x9370db, roughness: 0.4, metalness: 0.5, transparent: true, opacity: 0.8 }),
  web_attack: new THREE.MeshPhysicalMaterial({ color: 0x7b68ee, roughness: 0.3, metalness: 0.6, transparent: true, opacity: 0.8 }),

  // Default
  default: new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.5,
    metalness: 0.2,
    transparent: true,
    opacity: 0.5
  })
};

// Helper types
type Detail = { type: 'text' | 'code' | 'list' | 'subtitle'; content?: string; items?: string[] };

type Node = {
    id: string;
    label: string;
    group: string;
    desc: string;
    details?: Detail[];
    x?: number;
    y?: number;
    z?: number;
}

export default function KnowledgeMap() {
    const fgRef = useRef<any>(null);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [hoveredLink, setHoveredLink] = useState<any>(null);
    
    // Aggressive entry animation state
    const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });

    // Handle Escape key to deselect
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedNode(null);
                if (fgRef.current) {
                    // Reset camera to a general view
                    fgRef.current.cameraPosition(
                        { x: 0, y: 0, z: 200 }, // Position slightly further out
                        { x: 0, y: 0, z: 0 },   // Look at center
                        2000                    // Transition duration
                    );
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        // Step 1: Initialize roots
        const roots = knowledgeNodes.filter(n => n.group === 'root');
        setGraphData({ nodes: roots, links: [] });

        // Step 2: Add nodes progressively
        let availableNodes = knowledgeNodes.filter(n => n.group !== 'root');
        const totalNodes = availableNodes.length;
        let addedCount = 0;
        
        const timer = setInterval(() => {
            if (addedCount >= totalNodes) {
                clearInterval(timer);
                // Step 3: Once all nodes are floating, SNAP the links!
                setTimeout(() => {
                    setGraphData(prev => ({
                        nodes: prev.nodes,
                        links: knowledgeLinks
                    }));
                }, 500); // Wait a beat before snapping
                return;
            }

            // Add batch of 2 nodes (Slower pace)
            const batch = availableNodes.slice(addedCount, addedCount + 2);
            addedCount += 2;
            
            setGraphData(prev => ({
                nodes: [...prev.nodes, ...batch],
                links: []
            }));

        }, 50); // Slower interval for less chaos

        return () => clearInterval(timer);
    }, []);

  // Focus functionality
  const handleNodeClick = useCallback((node: Node) => {
    if (!node || node.x === undefined || node.y === undefined || node.z === undefined) return;

    // Use a Side View heuristic:
    // Instead of looking from (0,0,0) -> Node, we look from an offset.
    // 1. Vector from origin to node
    const nodePos = new THREE.Vector3(node.x, node.y, node.z);

    // If node is at 0,0,0 (root), just pull back on Z
    if (nodePos.lengthSq() === 0) {
        if (fgRef.current) {
            fgRef.current.cameraPosition({ x: 0, y: 10, z: 90 }, { x: 0, y: 0, z: 0 }, 3000);
        }
        setSelectedNode(node);
        return;
    }

    // 2. Define an arbitrary UP vector (World Y)
    const vUp = new THREE.Vector3(0, 1, 0);

    // 3. Compute a vector perpendicular to origin-node vector (the "tangent")
    // This gives us a "side" view relative to the center of the graph
    const vOriginToNode = nodePos.clone().normalize();
    let vRight = new THREE.Vector3();
    
    // Check if we are too vertical (close to Y axis)
    if (Math.abs(vOriginToNode.dot(vUp)) > 0.95) {
        vRight.crossVectors(vOriginToNode, new THREE.Vector3(0, 0, 1)).normalize();
    } else {
        vRight.crossVectors(vOriginToNode, vUp).normalize();
    }

    // 4. Calculate new camera position
    // We combine:
    // - The radial vector (push out from center) to see the context
    // - The tangent vector (move to the side) to see structure depth
    // - A bit of elevation (Y)
    
    const distance = 90;
    const offsetVector = vOriginToNode.clone().multiplyScalar(1.5).add(vRight).normalize().multiplyScalar(distance);
    const newCamPos = nodePos.clone().add(offsetVector);
    
    // Slight elevation for "God view" feel
    newCamPos.y += 20;

    if (fgRef.current) {
        fgRef.current.cameraPosition(
            { x: newCamPos.x, y: newCamPos.y, z: newCamPos.z }, // new position
            { x: node.x, y: node.y, z: node.z }, // lookAt ({ x, y, z })
            3000  // transitions duration ms
        );
    }
    
    setSelectedNode(node);
  }, [fgRef]);
  
  return (
    <div className='relative w-full h-screen bg-black overflow-hidden font-body'>
        <style>{`
            /* Custom Scrollbar for the details panel */
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.4);
            }
        `}</style>
      
      {/* 3D Graph Container */}
      <div className='absolute inset-0 z-0'>
        <ForceGraph3D
            ref={fgRef}
            graphData={graphData}
            
            // Physics for "Snapping" effect
            d3VelocityDecay={0.4} // Higher friction to slow them down as they travel
            d3AlphaDecay={0.02} // Faster cooling to settle the outer nodes
            warmupTicks={0} // See the entry happen
            cooldownTicks={100}

            // Visuals
            backgroundColor="#050510"
            showNavInfo={false}
            
            // Nodes
            nodeLabel="label"
            nodeResolution={16}
            nodeThreeObject={(node: any) => {
               const group = node.group as keyof typeof nodeMaterials;
               let size = 3;
               let material = nodeMaterials[group] || nodeMaterials.default;

               // Size logic based on node importance (heuristic on group name or specific IDs)
               if (group === 'root') size = 8;
               else if (['osint', 'network', 'pentest', 'tools', 'burp', 'crypto', 'web'].includes(group)) size = 6;
               else if (group.endsWith('_tool') || group.endsWith('_tech') || group.endsWith('_attack')) size = 4;

               const groupObj = new THREE.Group();
               const sphere = new THREE.Mesh( new THREE.SphereGeometry(size), material );
               groupObj.add(sphere);

               // Add aura if selected
               if (selectedNode && node.id === selectedNode.id) {
                    const aura = new THREE.Mesh(
                        new THREE.SphereGeometry(size * 1.2),
                        new THREE.MeshBasicMaterial({
                            color: 0xffffff,
                            transparent: true,
                            opacity: 0.35, // Intensified opacity
                            side: THREE.BackSide,
                            depthWrite: false,
                            blending: THREE.AdditiveBlending // Makes it glow more
                        })
                    );
                    
                    groupObj.add(aura);
               }

               return groupObj;
            }}
            onNodeClick={(node: any) => handleNodeClick(node as Node)}
            onNodeHover={(node: any) => {
                document.body.style.cursor = node ? 'pointer' : 'default';
            }}

            // Links
            linkWidth={(link: any) => link === hoveredLink ? 3 : 1}
            linkDirectionalParticles={(link: any) => link === hoveredLink ? 4 : 2}
            linkDirectionalParticleWidth={(link: any) => link === hoveredLink ? 4 : 2}
            linkColor={(link: any) => link === hoveredLink ? '#00ffff' : '#ffffff33'}
            
            // Interaction Links
            onLinkClick={(link: any) => {
                // Naviguer vers la cible du lien
                if (link.target) handleNodeClick(link.target as Node);
            }}
            onLinkHover={(link: any) => {
                setHoveredLink(link);
                document.body.style.cursor = link ? 'pointer' : 'default';
            }}
        />
      </div>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-6">
        
        {/* Header */}
        <div className="flex justify-between items-start pointer-events-auto">
             <Link to="/" className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 text-white transition-all border border-white/10 group">
                <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
             </Link>
             
             <div className="bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
                 <h2 className="text-white font-display text-xl tracking-widest text-center flex gap-3 items-center">
                    <FontAwesomeIcon icon={faProjectDiagram} className="text-indigo-500"/>
                    NEXUS // CYBER
                 </h2>
             </div>

             <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>
        
        {/* Helper Text */}
        {!selectedNode && (
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 text-center pointer-events-none"
             >
                <div className="text-4xl animate-pulse font-display mb-2">INITIALIZING...</div>
                <div className="font-mono text-sm">[CLICK TO EXPLORE NODES]</div>
             </motion.div>
        )}

        {/* Selected Node Details Panel */}
        <AnimatePresence>
            {selectedNode && (
                <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    className="absolute right-0 top-20 bottom-20 w-full md:w-96 bg-black/80 backdrop-blur-xl border-l border-white/10 p-8 pointer-events-auto overflow-y-auto shadow-2xl custom-scrollbar"
                >
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest border border-indigo-400/30 px-2 py-1 rounded">{selectedNode.group}</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                    </div>
                    
                    <h1 className="text-4xl font-display text-white mb-6 leading-none tracking-wide">{selectedNode.label}</h1>
                    
                    <div className="h-[1px] w-full bg-gradient-to-r from-indigo-600 to-transparent mb-8"></div>
                    
                    <p className="font-body text-slate-300 text-lg leading-relaxed mb-8">
                        {selectedNode.desc}
                    </p>
                    
                    {/* Render Detailed Content */}
                    <div className="space-y-6">
                        {selectedNode.details?.map((detail, index) => {
                            if (detail.type === 'subtitle') {
                                return <h3 key={index} className="text-xl font-display text-white mt-6 mb-2 border-b border-white/10 pb-1">{detail.content}</h3>;
                            }
                            if (detail.type === 'code') {
                                return (
                                    <div key={index} className="bg-black/50 border border-white/20 rounded-md p-3 font-mono text-xs text-green-400 overflow-x-auto">
                                       $ {detail.content}
                                    </div>
                                );
                            }
                            if (detail.type === 'list' && detail.items) {
                                return (
                                    <ul key={index} className="list-disc list-inside text-slate-300 space-y-1 text-sm">
                                        {detail.items.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                );
                            }
                            return <p key={index} className="text-slate-400 text-sm leading-relaxed">{detail.content}</p>;
                        })}
                    </div>

                    {!selectedNode.details && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-8">
                            <h4 className="text-sm font-bold text-white mb-2 font-display tracking-wide">SYSTEM</h4>
                            <div className="text-xs font-mono text-slate-500">
                                &gt; No additional data found in archive.
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>

        {/* Footer / Controls Hint */}
        <div className="pointer-events-auto flex justify-between items-end text-white/30 font-mono text-xs">
            <div>
                 [LMB] ROTATE • [RMB] PAN • [scroll] ZOOM
            </div>
            <div>
                NODES: {knowledgeNodes.length} • LINKS: {knowledgeLinks.length}
            </div>
        </div>
        
      </div>

    </div>
  );
}
