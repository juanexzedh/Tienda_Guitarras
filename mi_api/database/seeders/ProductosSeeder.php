<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductosSeeder extends Seeder
{
    public function run(): void
    {
        $json = file_get_contents(base_path('guitarras_procesadas_final.json'));

        $productos = json_decode($json, true);

        foreach ($productos as $producto) {

            Producto::create([
                'maker' => $producto['Maker'],
                'model' => $producto['Model'],
                'introduced' => $producto['Introduced'],

                'notable_user1' => $producto['NotableUser1'],
                'notable_user2' => $producto['NotableUser2'],
                'notable_user3' => $producto['NotableUser3'],

                'feature1' => $producto['Feature1'],
                'feature2' => $producto['Feature2'],
                'feature3' => $producto['Feature3'],
                'feature4' => $producto['Feature4'],
                'feature5' => $producto['Feature5'],

                'popularity' => $producto['Popularity'],

                'dates' => $producto['Dates'],

                'finish1' => $producto['Finish1'],
                'finish2' => $producto['Finish2'],
                'finish3' => $producto['Finish3'],
                'finish4' => $producto['Finish4'],
                'finish5' => $producto['Finish5'],

                'tipo' => $producto['Tipo'],

                'imagen' => $producto['Imagen'],
                'review_video' => $producto['ReviewVideo'],
                'imagen_producto' => $producto['ImagenProducto'],

                'precio' => $producto['Precio']
            ]);
        }
    }
}