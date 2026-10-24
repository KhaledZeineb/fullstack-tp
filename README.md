# Fullstack TP — Angular, Next.js et Docker

## Angular
- Image Docker : zeinebkhaled/ngapp:1.0
- Docker Hub : https://hub.docker.com/r/zeinebkhaled/ngapp
- Application : http://localhost:8080

## Next.js
- Image Docker : zeinebkhaled/nxapp:1.0
- Docker Hub : https://hub.docker.com/r/zeinebkhaled/nxapp
- Application : http://localhost:3001

## Lancer Angular
```bash
docker pull zeinebkhaled/ngapp:1.0
docker run -d --name ngapp-container -p 8080:80 zeinebkhaled/ngapp:1.0
```

## Lancer Next.js
```bash
docker pull zeinebkhaled/nxapp:1.0
docker run -d --name nxapp-container -p 3001:3000 zeinebkhaled/nxapp:1.0
```

