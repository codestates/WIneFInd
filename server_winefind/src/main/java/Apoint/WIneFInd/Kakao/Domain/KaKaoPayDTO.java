package Apoint.WIneFInd.Kakao.Domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Getter
@Setter
public class KaKaoPayDTO {

    public String orderId;
    public String userId;
    public String itemName;
    public String quantity;
    public String totalAmount;
    public String tax;

}
