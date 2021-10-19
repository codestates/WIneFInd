localhost p12 파일을 https에 넣어주세요!

//// application.properties 에 아래 내용을 넣어주세요 ////

server.address=localhost
server.port=4000

server.ssl.key-store=classpath:localhost.p12
server.ssl.key-store-type=PKCS12
server.ssl.key-store-password=changeit

spring.jpa.database=mysql
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect

spring.datasource.url=jdbc:mysql://localhost:3306/winefind?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=create

spring.datasource.initialization-mode=always