const demoHandler = (req, res) => {
    res.send(
        {
        "empleados": [
          {
            "nombre": "Alice Johnson",
            "edad": 28,
            "puesto": "Ingeniera de Software",
            "ubicación": "Ciudad Ejemplo"
          },
          {
            "nombre": "Bob Smith",
            "edad": 32,
            "puesto": "Diseñador Gráfico",
            "ubicación": "Otra Ciudad"
          },
          {
            "nombre": "Charlie Brown",
            "edad": 25,
            "puesto": "Chef",
            "ubicación": "Ciudad del Chef"
          },
          {
            "nombre": "David White",
            "edad": 30,
            "puesto": "Médico",
            "ubicación": "Ciudad Médica"
          }
        ],
        "productos": [
          {
            "nombre": "Producto A",
            "precio": 19.99,
            "stock": 50,
            "categoria": "Electrónica"
          },
          {
            "nombre": "Producto B",
            "precio": 12.49,
            "stock": 30,
            "categoria": "Ropa"
          },
          {
            "nombre": "Producto C",
            "precio": 5.99,
            "stock": 100,
            "categoria": "Hogar"
          },
          {
            "nombre": "Producto D",
            "precio": 7.99,
            "stock": 20,
            "categoria": "Deportes"
          }
        ],
        "clientes": [
          {
            "nombre": "Elena García",
            "edad": 35,
            "correo": "elena@example.com",
            "ciudad": "Ciudad Cliente"
          },
          {
            "nombre": "Franklin Rodriguez",
            "edad": 42,
            "correo": "franklin@example.com",
            "ciudad": "Otra Ciudad Cliente"
          },
          {
            "nombre": "Grace Davis",
            "edad": 28,
            "correo": "grace@example.com",
            "ciudad": "Ciudad Cliente"
          }
        ]
      }
      );
};

export { demoHandler };