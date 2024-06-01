Zadanie polega na rozszerzeniu przykładu łańcucha CI dla usługi GitHub Actions o testowanie obrazu Docker pod kątem podatności na zagrożenia przy użyciu usługi Docker Scout. Test ten ma na celu zapewnienie, że obraz zostanie przesłany do publicznego repozytorium obrazów na GitHub (ghcr.io) tylko wtedy, gdy nie zawiera zagrożeń sklasyfikowanych jako krytyczne lub wysokie.


Workflow jest skonfigurowany w pliku `.github/workflows/docker-image.yml`. Obejmuje on następujące kroki:

1. "checkout out the source_repo": skopiowanie zawartości repozytorium do maszyny wirtualnej hosta.
2. "Docker metadata definitions": definiowanie metadanych obrazu Docker, w tym sposobu tagowania obrazu na podstawie typu wydania.
3. "QEMU set-up": przygotowanie emulatora QEMU w systemie, jeśli jest to potrzebne do budowania obrazów na różnych architekturach.
4. "Buildx set-up": konfiguracja narzędzia Buildx do budowania obrazów wieloarchitekturalnych.
5. "Login to GitHub Container Registry": uwierzytelnienie 
6. "Build and push Docker image": budowanie obrazu Docker z pliku Dockerfile
7. "Docker Scout - CVE Analysis": analiza podatności CVE w zbudowanym obrazie Docker.
8. "Determine CVE Severity": sprawdzenie, czy w obrazie występują krytyczne lub wysokie podatności CVE.
9. "Push Docker image if no critical or high CVEs": ten krok używa warunku if, aby sprawdzić, czy obraz Docker nie zawiera krytycznych lub wysokich zagrożeń. Jeśli tak, obraz jest przesyłany do GitHub Container Registry

