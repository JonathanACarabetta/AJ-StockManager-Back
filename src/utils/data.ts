import { CreateCategoryDTO } from "src/dtos/createCategoryDTO";
import { CreateProductDTO } from "src/dtos/createProductDTO";
import { createProviderDTO } from "src/dtos/createProviderDTO";

export const categories:CreateCategoryDTO[] = [
    { name: 'Electrónica' },
    { name: 'Hogar' },
    { name: 'Ropa' },
    { name: 'Deportes' },
    { name: 'Libros' },
    { name: 'Juguetes' },
    { name: 'Salud y Belleza' },
    { name: 'Alimentos' },
    { name: 'Bebidas' },
    { name: 'Mascotas' }
]
export const providers:createProviderDTO[] = [
    { name: 'Proveedor 1', address: 'Calle Falsa 123, Ciudad A' },
    { name: 'Proveedor 2', address: 'Avenida Siempre Viva 456, Ciudad B' },
    { name: 'Proveedor 3', address: 'Calle del Comercio 789, Ciudad C' },
    { name: 'Proveedor 4', address: 'Avenida Central 101, Ciudad D' },
    { name: 'Proveedor 5', address: 'Calle Principal 202, Ciudad E' }
];

export const products:CreateProductDTO[] = [
    {
      name: 'Televisor LED 50"',
      categories: [1], // Electrónica
      providers: [1], // Proveedor 1
      cost: 450,
      price: 100,
      stock: 25,
      bar_code: '123456789012',
      brand: 'Samsung'
    },
    {
      name: 'Sofá de 3 plazas',
      categories: [2], // Hogar
      providers: [2], // Proveedor 2
      cost: 300,
      price: 100,
      stock: 15,
      bar_code: '234567890123',
      brand: 'Ikea'
    },
    {
      name: 'Camiseta deportiva',
      categories: [3, 4], // Ropa, Deportes
      providers: [3], // Proveedor 3
      cost: 20,
      price: 100,
      stock: 100,
      bar_code: '345678901234',
      brand: 'Nike'
    },
    {
      name: 'Bicicleta de montaña',
      categories: [4], // Deportes
      providers: [4], // Proveedor 4
      cost: 500,
      price: 100,
      stock: 10,
      bar_code: '456789012345',
      brand: 'Giant'
    },
    {
      name: 'Libro: El Quijote',
      categories: [5], // Libros
      providers: [5], // Proveedor 5
      cost: 25,
      price: 100,
      stock: 50,
      bar_code: '567890123456',
      brand: 'Editorial Planeta'
    },
    {
      name: 'Muñeca de colección',
      categories: [6], // Juguetes
      providers: [1], // Proveedor 1
      cost: 45,
      price: 100,
      stock: 60,
      bar_code: '678901234567',
      brand: 'Mattel'
    },
    {
      name: 'Crema hidratante',
      categories: [7], // Salud y Belleza
      providers: [2], // Proveedor 2
      cost: 12,
      price: 100,
      stock: 80,
      bar_code: '789012345678',
      brand: 'Nivea'
    },
    {
      name: 'Cereal integral',
      categories: [8], // Alimentos
      providers: [3], // Proveedor 3
      cost: 4,
      price: 100,
      stock: 200,
      bar_code: '890123456789',
      brand: 'Kellogg\'s'
    },
    {
      name: 'Botella de agua 1L',
      categories: [9], // Bebidas
      providers: [4], // Proveedor 4
      cost: 1.5,
      price: 100,
      stock: 500,
      bar_code: '901234567890',
      brand: 'Evian'
    },
    {
      name: 'Comida para gatos 2kg',
      categories: [10], // Mascotas
      providers: [5], // Proveedor 5
      cost: 18,
      price: 100,
      stock: 120,
      bar_code: '012345678901',
      brand: 'Purina'
    },
    {
      name: 'Auriculares inalámbricos',
      categories: [1], // Electrónica
      providers: [1], // Proveedor 1
      cost: 80,
      price: 100,
      stock: 75,
      bar_code: '112345678901',
      brand: 'Sony'
    },
    {
      name: 'Colchón King Size',
      categories: [2], // Hogar
      providers: [2], // Proveedor 2
      cost: 600,
      price: 100,
      stock: 30,
      bar_code: '222345678901',
      brand: 'Sealy'
    },
    {
      name: 'Zapatos deportivos',
      categories: [3, 4], // Ropa, Deportes
      providers: [3], // Proveedor 3
      cost: 65,
      price: 100,
      stock: 90,
      bar_code: '332345678901',
      brand: 'Adidas'
    },
    {
      name: 'Raqueta de tenis',
      categories: [4], // Deportes
      providers: [4], // Proveedor 4
      cost: 150,
      price: 100,
      stock: 40,
      bar_code: '442345678901',
      brand: 'Wilson'
    },
    {
      name: 'Libro: 1984',
      categories: [5], // Libros
      providers: [5], // Proveedor 5
      cost: 20,
      price: 100,
      stock: 65,
      bar_code: '552345678901',
      brand: 'Editorial Penguin'
    },
    {
      name: 'Lego Star Wars',
      categories: [6], // Juguetes
      providers: [1], // Proveedor 1
      cost: 120,
      price: 100,
      stock: 45,
      bar_code: '662345678901',
      brand: 'Lego'
    },
    {
      name: 'Mascarilla facial',
      categories: [7], // Salud y Belleza
      providers: [2], // Proveedor 2
      cost: 8,
      price: 100,
      stock: 150,
      bar_code: '772345678901',
      brand: 'Garnier'
    },
    {
      name: 'Galletas de avena',
      categories: [8], // Alimentos
      providers: [3], // Proveedor 3
      cost: 3,
      price: 100,
      stock: 220,
      bar_code: '882345678901',
      brand: 'Quaker'
    },
    {
      name: 'Jugo de naranja 1L',
      categories: [9], // Bebidas
      providers: [4], // Proveedor 4
      cost: 2.5,
      price: 100,
      stock: 320,
      bar_code: '992345678901',
      brand: 'Tropicana'
    },
    {
      name: 'Correa para perros',
      categories: [10], // Mascotas
      providers: [5], // Proveedor 5
      cost: 15,
      price: 100,
      stock: 70,
      bar_code: '102345678901',
      brand: 'PetSafe'
    }
];
  
