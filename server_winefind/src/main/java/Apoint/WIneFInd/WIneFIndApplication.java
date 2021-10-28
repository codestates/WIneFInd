package Apoint.WIneFInd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class WIneFIndApplication {

	public static void main(String[] args) {
		SpringApplication.run(WIneFIndApplication.class, args);
		List<Long> longTypeList = new ArrayList();
		int a = 1;

		longTypeList.add();

		System.out.println("AAAA:"+longTypeList);
	}
}
