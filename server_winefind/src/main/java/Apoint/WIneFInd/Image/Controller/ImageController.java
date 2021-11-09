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


    @PostMapping("/upload")
    public String ImageUploadFile(@RequestParam(value = "file") MultipartFile file) {
        return imageService.imageUploadFile(file);
    }

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

    @DeleteMapping("image/{fileName}")
    public ResponseEntity<String> ImageDeleteFile(@PathVariable String fileName) {
        String deleteImage = imageService.deleteFile(fileName);

        return ResponseEntity.ok().body(deleteImage);
    }
}
