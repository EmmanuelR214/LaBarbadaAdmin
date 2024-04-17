import React from "react";
import { Icon } from "@iconify/react";

const Home = () => {
  return (
    <div>
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-8">
            Bienvenido a la administración de la Barbada
          </h1>
          <p className="text-lg text-center mb-12">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa,
            exercitationem inventore quos praesentium perferendis nisi velit
            provident nostrum officiis in, eum obcaecati beatae, distinctio
            reprehenderit quis magni illo vitae laudantium.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="bg-white rounded-lg text-black p-2 flex flex-col items-center">
              <Icon icon="dashicons:food" className="text-4xl" />
              <h1 className="text-center text-3xl font-semibold">Platillos</h1>
              <p className="text-center">Agrega nuevos productos para mostrar en el menú</p>
            </div>

            <div className="bg-white rounded-lg text-black p-2 flex flex-col items-center">
              <Icon icon="material-symbols:image-outline" className="text-4xl" />
              <h1 className="text-center text-3xl font-semibold">Publicidad</h1>
              <p className="text-center">Agrega nuevos elementos publicitarios</p>
            </div>

            <div className="bg-white rounded-lg text-black p-2 flex flex-col items-center">
              <Icon icon="uil:notes" className="text-4xl" />
              <h1 className="text-center text-3xl font-semibold">Reportes</h1>
              <p className="text-center">Genera reportes de las ventas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="stat-block text-center">
              <h2 className="text-4xl font-bold mb-2">100+</h2>
              <p className="text-gray-900">
                Grandes clientes que confían mucho en nosotros
              </p>
            </div>
            <div className="stat-block text-center">
              <h2 className="text-4xl font-bold mb-2">5 años</h2>
              <p className="text-gray-900">
                De experiencia proporcionando un excelente servicio
              </p>
            </div>
            <div className="stat-block text-center">
              <h2 className="text-4xl font-bold mb-2">98%</h2>
              <p className="text-gray-900">
                Índice de satisfacción del cliente
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Confianza y liderazgo en el mercado
          </h2>
          <div className="flex flex-wrap justify-center">
            <img
              src="img/emblema.png"
              alt="Basecamp"
              className="w-1/5 h-auto mr-4"
            />
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
            Aumente el tráfico y las ventas
          </h2>
          <p className="text-lg text-center mb-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            vitae dignissimos illum omnis architecto fugit est quaerat incidunt.
            Ducimus doloribus maxime reprehenderit facere porro debitis!
            Accusamus architecto sit ex dolores!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;