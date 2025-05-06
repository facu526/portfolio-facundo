// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario enviado');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-8 space-y-16">
      {/* Hero con fondo degradado oscuro */}
      <div className="w-full h-64 bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Facundo Sanchez</h1>
        <h2 className="text-xl text-gray-300">Estudiante de Ingeniería en Informática</h2>
      </div>

      {/* Sobre mí */}
      <section className="max-w-3xl text-center space-y-4">
        <h3 className="text-2xl font-semibold">Sobre mí</h3>
        <p>
          Actualmente estudio Ingeniería en Informática con el objetivo de desarrollarme profesionalmente como programador,
          tanto en el desarrollo web como en la creación de aplicaciones. Me apasiona encontrar formas de optimizar y
          automatizar tareas cotidianas a través del código, buscando siempre soluciones que simplifiquen procesos y mejoren
          la eficiencia en el día a día.
        </p>
      </section>

      {/* Tecnologías */}
      <section className="max-w-4xl text-center">
        <h3 className="text-2xl font-semibold mb-6">Tecnologías</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {[
            { name: 'Python', src: 'https://images.icon-icons.com/2699/PNG/512/python_logo_icon_168886.png' },
            { name: 'Java', src: 'https://images.vexels.com/media/users/3/166401/isolated/lists/b82aa7ac3f736dd78570dd3fa3fa9e24-icono-del-lenguaje-de-programacion-java.png' },
            { name: 'HTML', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png' },
            { name: 'CSS', src: 'https://www.superbefilms.com/wp-content/uploads/2016/03/css-logo.png' },
            { name: 'SQL', src: 'https://brandlogos.net/wp-content/uploads/2025/03/microsoft_sql_server-logo_brandlogos.net_wykhq.png' },
            { name: 'JavaScript', src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
          ].map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
            >
              <img src={tech.src} alt={tech.name} className="w-16 h-16 mb-2" />
              <p>{tech.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contáctame */}
      <section className="w-full bg-gray-800 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-2xl font-semibold">Contáctame</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full px-4 py-2 bg-gray-700 border border-white rounded text-white placeholder-white"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 bg-gray-700 border border-white rounded text-white placeholder-white"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mensaje"
              className="w-full px-4 py-2 bg-gray-700 border border-white rounded text-white placeholder-white"
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
