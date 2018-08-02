<?php

namespace App\Helpers;

use App\Order;

class Calculator
{
    public static function inOrder() {
        $orders = Order::all();
        $money = 0;
        foreach ($orders as $order) {
            if ($order->status == 0) {
                $money += ($order->type == 3 ? $order->real_price : $order->price);
            }
        }

        return $money;
    }

    public static function interest() {
        $orders = Order::all();
        $money = 0;
        foreach ($orders as $order) {
            if ($order->status == 1) {
                $money += ($order->type == 3 ? ($order->money - $order->real_price) : ($order->money - $order->price));
            }
        }

        return $money;
    }
}