<?php

namespace App;

use App\Helpers\Constants;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Order extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'cus_id', 'item', 'item_info', 'price', 'real_price', 'package','interest', 'start_date', 'end_date', 'money', 'pay_date', 'type', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    public function getList($filters = [], $type = null)
    {
        $select = [
            'orders.*',
            'customers.name as cus_name',
            'customers.cmt as cus_cmt',
            'customers.phone as cus_phone'
        ];
        $query = static::select($select)
            ->leftjoin('customers', 'customers.id', '=', 'orders.cus_id');;
        if (isset($filters['name']) && $filters['name']) {
            $query->where('customers.name', 'like', '%' . $filters['name'] . '%');
        }
        if (isset($filters['cmt']) && $filters['cmt']) {
            $query->where('customers.cmt', 'like', '%' . $filters['cmt'] . '%');
        }
        if (isset($filters['phone']) && $filters['phone']) {
            $query->where('customers.phone', 'like', '%' . $filters['phone'] . '%');
        }
        if (isset($filters['end_date']) && $filters['end_date']) {
            $filters['end_date'] = date('Y-m-d', strtotime($filters['end_date']));
            $query->where('end_date', 'like', '%' . $filters['end_date'] . '%');
        }
        if ($type == 'count') {
            return $query->count();
        }

        return $query->orderBy('id', 'desc')->paginate(Constants::$per_page);
    }
}
