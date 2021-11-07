package Apoint.WIneFInd.Kakao.Domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class KaKaoPayDTO {

    public String cid;
    public String partner_order_id;
    public String partner_user_id;
    public String item_name;
    public String quantity;
    public String total_amount;
    public String vat_amount;
    public String tax_free_amount;
    public String approval_url;
    public String fail_url;
    public String cancel_url;
}
