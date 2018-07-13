<div class="table-responsive">
    <table class="table table-bordered" style="text-align: center">
        <tbody>
            <?php for($row = 1; $row <= $day/10; $row++) { ?>
            <tr>
                <?php for($col = 1; $col <= 10; $col++) {?>
                <td>Mark</td>
                <?php }?>
            </tr>
            <?php }?>
        </tbody>
    </table>
</div>