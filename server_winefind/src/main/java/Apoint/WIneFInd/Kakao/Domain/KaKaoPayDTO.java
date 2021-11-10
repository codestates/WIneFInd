package Apoint.WIneFInd.Kakao.Domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KaKaoPayDTO {

    public String userId;
    public String orderId;
    public String itemName;
    public String quantity;
    public String totalAmount;
    public String tax;

}
