package Apoint.WIneFInd.Image.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Slf4j
@Service
@Transactional
public class ImageService {

    // S3에서 정했던 bucketName값 application.properties 에서 가져오기
    @Value("${application.bucket.name}")
    private String bucketName;

    // Config 에서 등록한 amazonS3 가져오기
    private final AmazonS3 amazonS3;

    @Autowired
    public ImageService(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String imageUploadFile(MultipartFile file) {

        System.out.println("imageUploadFile() 진입 Image -> Service -> p37");
        System.out.println("S3 bucketName : " + bucketName);

        // S3에 등록할 파일이름에 현재 시간_ 를 붙여서 고유한 이름만들기
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // 이미지 파일을 byte로 Convert 하기
        File fileObj = convertMultipartFile(file);

        System.out.println("convertMultipartFile() Image -> Service -> p46");

        // 양식에 맞춰서 정보를 입력하여 버킷에 이미지 올리기
        PutObjectResult putObjectResult = amazonS3.putObject(new PutObjectRequest(bucketName, fileName, fileObj));

        System.out.println("amazonS3.putObject() 실행 됬니?" + putObjectResult.getContentMd5());

        fileObj.delete();

        System.out.println("imageUploadFile() 아웃 Image -> Service -> p55");

        return "File upload : " + fileName;
    }

    public byte[] downloadFile(String fileName) {

        S3Object s3Object = amazonS3.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public File convertMultipartFile(MultipartFile file) {
        File convertFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("convert 가능한 파일이 없습니다. ", e);
        }
        return convertFile;
    }

    // 이미지 파일 삭제하기
    public String deleteFile(String fileName) {
        amazonS3.deleteObject(bucketName, fileName);
        return fileName + " 삭제 되었습니다.";
    }
}
