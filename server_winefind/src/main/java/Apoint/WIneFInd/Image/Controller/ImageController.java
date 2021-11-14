package Apoint.WIneFInd.Image.Controller;

import Apoint.WIneFInd.Image.Service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageController {

    @Autowired
    private ImageService imageService;

    // 파일 버킷에 업로드 하기
    @PostMapping("/upload")
    public String ImageUploadFile(@RequestParam(value = "file") MultipartFile file) {
        return imageService.imageUploadFile(file);
    }

    // 버킷에 있는 파일 가져오기
    @GetMapping("download/{fileName}")
    public ResponseEntity<ByteArrayResource> ImageDownloadFile(@PathVariable String fileName) {
        byte[] bytes = imageService.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(bytes);
        return ResponseEntity.ok()
                .contentLength(bytes.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    // 버킷에 있는 파일 삭제하기
    @DeleteMapping("image/{fileName}")
    public ResponseEntity<String> ImageDeleteFile(@PathVariable String fileName) {
        String deleteImage = imageService.deleteFile(fileName);

        return ResponseEntity.ok().body(deleteImage);
    }
}
