-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-07-2024 a las 00:48:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mundoviajero`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE database mundoviajero;

USE mundoviajero;

CREATE TABLE `actividades` (
  `id_actividad` int(11) NOT NULL,
  `id_destino` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id_actividad`, `id_destino`, `nombre`, `descripcion`) VALUES
(1, 7, 'Esquí en Cerro Catedral', 'Disfruta de las pistas de esquí más famosas de Sudamérica.'),
(2, 8, 'Tour de bodegas', 'Recorre las mejores bodegas y viñedos de la región vitivinícola de Argentina.'),
(3, 9, 'City tour por Salta', 'Visita los principales monumentos y plazas de la ciudad de Salta.'),
(4, 10, 'Trekking en Quebrada de Humahuaca', 'Descubre paisajes únicos y coloridos en una caminata memorable.'),
(5, 11, 'Visita a la Manzana Jesuítica', 'Explora la historia colonial de Córdoba en este recorrido cultural.'),
(6, 12, 'Paseo en lancha por las Cataratas del Iguazú', 'Acércate a las cataratas y disfruta de vistas impresionantes.'),
(7, 1, 'Tour por las Ruinas Mayas', 'Explora las antiguas ruinas mayas en Cancún y descubre su fascinante historia.'),
(8, 2, 'Visita al Coliseo Romano', 'Recorre uno de los monumentos más emblemáticos de la antigua Roma.'),
(9, 3, 'Tour por la Torre Eiffel', 'Sube a uno de los símbolos más reconocibles de París y disfruta de vistas panorámicas.'),
(10, 4, 'Visita al Cristo Redentor', 'Disfruta de vistas panorámicas de Río de Janeiro desde uno de sus símbolos más icónicos.'),
(11, 5, 'Recorrido por South Beach', 'Disfruta de las playas y la vida nocturna de Miami en el famoso distrito de South Beach.'),
(12, 6, 'Visita a la Sagrada Familia', 'Descubre la impresionante obra arquitectónica de Antoni Gaudí en Barcelona.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destinos`
--

CREATE TABLE `destinos` (
  `id_destino` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `pais` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos`
--

INSERT INTO `destinos` (`id_destino`, `nombre`, `pais`, `descripcion`, `precio`) VALUES
(1, 'Cancún', 'México', 'Hermosas playas caribeñas y sitios arqueológicos mayas.', 710815.00),
(2, 'Roma', 'Italia', 'Capital histórica de Italia con sus ruinas antiguas y el Vaticano.', 1371299.00),
(3, 'París', 'Francia', 'Ciudad del amor con la Torre Eiffel y el Louvre.', 1551788.00),
(4, 'Río de Janeiro', 'Brasil', 'Famoso por sus playas como Copacabana e Ipanema y el Cristo Redentor.', 259202.00),
(5, 'Miami', 'Estados Unidos', 'Destino de playa y compras en Florida.', 818541.00),
(6, 'Barcelona', 'España', 'Ciudad modernista con la Sagrada Familia y el Parque Güell.', 1117878.00),
(7, 'Bariloche', 'Argentina', 'Ciudad de montaña junto al lago Nahuel Huapi.', 61108.00),
(8, 'Mendoza', 'Argentina', 'Región vinícola y montañosa.', 31788.00),
(9, 'Salta', 'Argentina', 'Ciudad colonial en el noroeste argentino.', 61108.00),
(10, 'Jujuy', 'Argentina', 'Provincia con paisajes de montaña y colores únicos.', 52980.00),
(11, 'Córdoba', 'Argentina', 'Ciudad universitaria y cultural en el centro del país.', 31788.00),
(12, 'Cataratas del Iguazú', 'Argentina', 'Impresionante conjunto de cascadas en la selva misionera.', 51214.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destinos_internacionales`
--

CREATE TABLE `destinos_internacionales` (
  `id_destino_internacional` int(11) NOT NULL,
  `id_destino` int(11) NOT NULL,
  `idioma_oficial` varchar(255) DEFAULT NULL,
  `requisitos_visa` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos_internacionales`
--

INSERT INTO `destinos_internacionales` (`id_destino_internacional`, `id_destino`, `idioma_oficial`, `requisitos_visa`) VALUES
(1, 2, 'Italiano', 'No se requiere visa para ciudadanos de la Union Europea.'),
(2, 3, 'Francés', 'No se requiere visa para ciudadanos de la Union Europea.'),
(3, 5, 'Inglés', 'No se requiere visa para ciudadanos de muchos países.'),
(4, 6, 'Español', 'No se requiere visa para ciudadanos de la Union Europea.'),
(5, 5, 'Inglés', 'No se requiere visa para ciudadanos de muchos países.'),
(6, 6, 'Español', 'No se requiere visa para ciudadanos de la Union Europea.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destinos_nacionales`
--

CREATE TABLE `destinos_nacionales` (
  `id_destino_nacional` int(11) NOT NULL,
  `id_destino` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `tipo_clima` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos_nacionales`
--

INSERT INTO `destinos_nacionales` (`id_destino_nacional`, `id_destino`, `estado`, `tipo_clima`) VALUES
(1, 7, 'Río Negro', 'Templado frío'),
(2, 8, 'Mendoza', 'Desértico'),
(3, 9, 'Salta', 'Subtropical'),
(4, 10, 'Jujuy', 'Árido'),
(5, 11, 'Córdoba', 'Templado'),
(6, 12, 'Misiones', 'Tropical');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `destinos`
--
ALTER TABLE `destinos`
  ADD PRIMARY KEY (`id_destino`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `destinos_internacionales`
--
ALTER TABLE `destinos_internacionales`
  ADD PRIMARY KEY (`id_destino_internacional`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `destinos_nacionales`
--
ALTER TABLE `destinos_nacionales`
  ADD PRIMARY KEY (`id_destino_nacional`),
  ADD KEY `id_destino` (`id_destino`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `destinos`
--
ALTER TABLE `destinos`
  MODIFY `id_destino` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `destinos_internacionales`
--
ALTER TABLE `destinos_internacionales`
  MODIFY `id_destino_internacional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `destinos_nacionales`
--
ALTER TABLE `destinos_nacionales`
  MODIFY `id_destino_nacional` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_ibfk_1` FOREIGN KEY (`id_destino`) REFERENCES `destinos` (`id_destino`);

--
-- Filtros para la tabla `destinos_internacionales`
--
ALTER TABLE `destinos_internacionales`
  ADD CONSTRAINT `destinos_internacionales_ibfk_1` FOREIGN KEY (`id_destino`) REFERENCES `destinos` (`id_destino`);

--
-- Filtros para la tabla `destinos_nacionales`
--
ALTER TABLE `destinos_nacionales`
  ADD CONSTRAINT `destinos_nacionales_ibfk_1` FOREIGN KEY (`id_destino`) REFERENCES `destinos` (`id_destino`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
