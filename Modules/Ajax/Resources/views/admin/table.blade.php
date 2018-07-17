<div class="table-responsive">
    <table class="table table-bordered" style="text-align: center">
        <tbody>
            <?php for($row = 1; $row <= $day/10; $row++) { ?>
            <tr>
                <?php for($col = 1; $col <= 10; $col++) {?>
                <td>
                    @if($col%2 == 0)
                    <button type="button" class="btn btn-success waves-effect" title="Đã thanh toán">{{ date('d-m', strtotime(' +'. $row*$col .' day')) }}</button>
                    @else
                    <button type="button" class="btn_pay btn bg-deep-orange waves-effect" title="Chưa thanh toán">{{ date('d-m', strtotime(' +'. $row*$col .' day')) }}</button>
                    @endif
                </td>
                <?php }?>
            </tr>
            <?php }?>
        </tbody>
    </table>
</div>