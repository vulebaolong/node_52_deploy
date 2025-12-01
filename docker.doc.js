// tạo image
// docker build -t img-be_cyber_community .

// chạy container
// docker run  --name con-be_cyber_community -p 3070:3069 -d --env-file .env img-be_cyber_community

// stop container
// docker stop con-be_cyber_community

// xoá container
// docker rm con-be_cyber_community

// restart container
// docker restart con-be_cyber_community

// xoá image
// docker rmi img-be_cyber_community

// lấy địa chỉ IP của container
// docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_DB_SQL_container

// chạy docker compose
// docker compose up -d
