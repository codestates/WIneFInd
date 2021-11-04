package Apoint.WIneFInd.Member.Domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpDTO {

    private String email;
    private String password;
    private String username;
    private String image;
}