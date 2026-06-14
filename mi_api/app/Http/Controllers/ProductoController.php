<?php

namespace App\Http\Controllers;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    //Mostrar todo
    public function index()
    {
        return Producto::all();
    }

    //Post
    public function store(Request $request)
    {
        return Producto::create($request->all());
    }

    //Mostrar con id
    public function show($id)
    {
        return Producto::findOrFail($id);
    }

    //update
    public function update(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $producto->update($request->all());
        return $producto;
    }

    //patch
    public function patch(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $producto->update($request->all());
        return $producto;
    }

    //Delete
    public function destroy($id)
    {
        return Producto::destroy($id);
    }
}