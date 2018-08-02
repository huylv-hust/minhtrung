<div class="table-responsive">
    <table class="table table-bordered" style="text-align: center">
        <tbody>
        <?php for($row = 1; $row <= $day / 10; $row++) { ?>
        <tr>
            <?php for($col = 1; $col <= 10; $col++) {?>
            <td>
                <?php
                    $start_date = isset($order->start_day) ? $order->start_day :  date('Y-m-d', strtotime($start_date));
                    $num = ($row - 1) * 10 + $col;
                    $date = date('d-m', strtotime(' +' . $num - 1 . ' day', strtotime($start_date)));
                    $pay_date = isset($order) ? $order->pay_date : $pay_date;
                ?>
                @if(strpos($pay_date, $date))
                    <button type="button" class="btn btn-success waves-effect"
                            title="Đã thanh toán">{{ $date }}</button>
                @else
                    <button type="button" class="btn_pay btn bg-deep-orange waves-effect"
                            title="Chưa thanh toán">{{ $date }}</button>
                @endif
            </td>
            <?php }?>
        </tr>
        <?php }?>
        </tbody>
    </table>
</div>