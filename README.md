# dogukan-atabay

## Docker ile çalıştırma (yerel / yayın)

```bash
# Image build + container başlat
docker compose up -d --build
```

**Tarayıcıda aç:** [http://127.0.0.1:3001](http://127.0.0.1:3001)

> ⚠️ **"Invalid response" hatası alıyorsanız:** Adres çubuğuna mutlaka **`http://`** yazın (https değil). Önerilen adres: **http://127.0.0.1:3001**

- Portu değiştirmek için `docker-compose.yml` içinde `ports: "3001:3000"` satırını düzenleyin.
- Loglar: `docker compose logs -f web`
- Durdurmak: `docker compose down`
