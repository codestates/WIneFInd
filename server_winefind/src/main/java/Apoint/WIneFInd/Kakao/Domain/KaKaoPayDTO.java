package Apoint.WIneFInd.Kakao.Domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class KaKaoPayDTO {

    public String orderId;
    public String userId;
    public String itemName;
    public String quantity;
    public String totalAmount;
    public String Tax;

}
