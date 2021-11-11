package Apoint.WIneFInd;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WIneFIndApplicationTests {


    @Test
    public void dfd ( ){

        String test = "3";
        Long tes = Long.parseLong(test);

        if(tes >= 3){
            System.out.println("3이상 입니다.");
        } else {
            System.out.println("아닙니다.");
        }
    }
}
