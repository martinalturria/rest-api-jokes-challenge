CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jokes (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO users (name) VALUES
    ('Manolito'),
    ('Pepe'),
    ('Isabel'),
    ('Pedro');

INSERT INTO categories (name) VALUES
    ('humor negro'),
    ('humor amarillo'),
    ('chistes verdes');

INSERT INTO jokes (text, user_id, category_id) VALUES
    ('¿Por qué los esqueletos no pelean entre ellos? Porque no tienen agallas.', 1, 1),
    ('¿Cuál es el colmo de un electricista? Que su mujer se llame Luz y sus hijos le sigan la corriente.', 1, 1),
    ('¿Qué le dice un jardinero a otro? Disfrutemos mientras podamos.', 1, 1),
    ('¿Qué hace una abeja en el gimnasio? Zum-ba.', 1, 2),
    ('¿Cómo se llama el campeón de buceo japonés? Tokofondo.', 1, 2),
    ('¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.', 1, 2),
    ('¿Qué le dice un árbol a otro? Nos dejaron plantados.', 1, 3),
    ('¿Cuál es el café más peligroso del mundo? El ex-preso.', 1, 3),
    ('¿Qué le dice una iguana a su hermana gemela? Somos iguanitas.', 1, 3),
    ('¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae bugs.', 2, 1),
    ('¿Cuál es el animal más antiguo? La cebra, porque está en blanco y negro.', 2, 1),
    ('¿Qué le dice un semáforo a otro? No me mires que me estoy cambiando.', 2, 1),
    ('¿Cómo se dice pañuelo en japonés? Sakamoko.', 2, 2),
    ('¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana.', 2, 2),
    ('¿Por qué las focas del circo miran siempre hacia arriba? Porque es donde están los focos.', 2, 2),
    ('¿Qué hace una impresora en una discoteca? Escáner.', 2, 3),
    ('¿Cuál es el último animal que subió al arca de Noé? El del-fin.', 2, 3),
    ('¿Qué le dice el número 3 al número 30? Para ser como yo tienes que ser sincero.', 2, 3),
    ('¿Cuál es el colmo de un astronauta? Tener una novia muy espacial.', 3, 1),
    ('¿Por qué los libros de matemáticas están tristes? Porque tienen muchos problemas.', 3, 1),
    ('¿Qué le dice un techo a otro? Techo de menos.', 3, 1),
    ('¿Cómo se despiden los químicos? Ácido un placer.', 3, 2),
    ('¿Qué le dice una pared a otra pared? Nos vemos en la esquina.', 3, 2),
    ('¿Por qué el libro de matemáticas se suicidó? Porque tenía muchos problemas.', 3, 2),
    ('¿Qué le dice un jaguar a otro jaguar? Jaguar you?.', 3, 3),
    ('¿Cuál es el colmo de Aladdín? Tener mal genio.', 3, 3),
    ('¿Qué hace un perro con un taladro? Taladrando.', 3, 3),
    ('¿Por qué los buzos se tiran de espaldas al agua? Porque si se tiran de frente caen dentro del bote.', 4, 1),
    ('¿Cuál es el colmo de un ciego? Llamarse Casimiro.', 4, 1),
    ('¿Qué le dice un cable a otro cable? Somos los intocables.', 4, 1),
    ('¿Cómo se llama el primo vegetariano de Bruce Lee? Broco Lee.', 4, 2),
    ('¿Qué le dice una uva verde a una uva morada? Respira, respira.', 4, 2),
    ('¿Por qué las ballenas no pueden volar? Porque no tienen alas.', 4, 2),
    ('¿Qué le dice Superman a Superwoman? ¿Supermercado?.', 4, 3),
    ('¿Cuál es el colmo de un electricista suicida? Pegarse un tiro en las sienes.', 4, 3),
    ('¿Qué le dice el cero al ocho? Bonito cinturón.', 4, 3);

CREATE INDEX idx_jokes_user_id ON jokes(user_id);
CREATE INDEX idx_jokes_category_id ON jokes(category_id);
