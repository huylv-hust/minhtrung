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
        'cus_id', 'item', 'item_info', 'price', 'real_price', 'interest', 'end_date', 'money', 'pay_date', 'type'
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
        $query = static::select(['*']);
        if (isset($filters['name']) && $filters['name']) {
            $query->where('name', 'like', '%' . $filters['name'] . '%');
        }
        if (isset($filters['cmt']) && $filters['cmt']) {
            $query->where('cmt', 'like', '%' . $filters['cmt'] . '%');
        }
        if (isset($filters['phone']) && $filters['phone']) {
            $query->where('phone', 'like', '%' . $filters['phone'] . '%');
        }
        if (isset($filters['email']) && $filters['email']) {
            $query->where('email', 'like', '%' . $filters['email'] . '%');
        }
        if ($type == 'count') {
            return $query->count();
        }

        return $query->orderBy('id', 'desc')->paginate(Constants::$per_page);
    }
}
