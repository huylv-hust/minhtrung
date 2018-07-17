<div class="table-responsive">
    <table class="table table-bordered" style="text-align: center">
        <tbody>
            <?php for($row = 1; $row <= $day/10; $row++) { ?>
            <tr>
                <?php for($col = 1; $col <= 10; $col++) {?>
                <td>
                    <?php $date = date('d-m', strtotime(' +'. $row*$col .' day'));?>
                    @if(isset($order) && strpos($order->pay_date, $date))
                    <button type="button" class="btn btn-success waves-effect" title="Đã thanh toán">{{ $date }}</button>
                    @else
                    <button type="button" class="btn_pay btn bg-deep-orange waves-effect" title="Chưa thanh toán">{{ $date }}</button>
                    @endif
                </td>
                <?php }?>
            </tr>
            <?php }?>
        </tbody>
    </table>
</div>