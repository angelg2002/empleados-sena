import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Text,
  TextInput,
} from "react-native-paper";

export default function Index() {
  // Estados para el formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [idEdicion, setIdEdicion] = useState(null); // Si es null, estamos creando. Si tiene un número, estamos editando.
  // Estados para la lista
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(false);

  // CAMBIA ESTO POR TU IP REAL
  const API_URL = "http://192.168.0.3:3000/api/empleados";

  const obtenerEmpleados = async () => {
    setCargando(true);
    try {
      // Agregamos un timestamp para evitar que React Native (especialmente Android) use datos en caché (viejos)
      const respuesta = await fetch(`${API_URL}?_t=${Date.now()}`);
      const datos = await respuesta.json();
      setEmpleados(datos);
    } catch (error) {
      console.error("Error al obtener:", error);
    } finally {
      setCargando(false);
    }
  };

const guardarEmpleado = async () => {
  if (!nombre || !apellido || !salario) return;

  // Evaluamos si vamos a crear (POST) o a actualizar (PUT)
  const metodo = idEdicion ? 'PUT' : 'POST';
  const urlFinal = idEdicion ? `${API_URL}/${idEdicion}` : API_URL;

  try {
    const respuesta = await fetch(urlFinal, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
        // Aseguramos que salario sea tratado como string antes de hacer replace, por seguridad
        body: JSON.stringify({ nombre, apellido, cargo, salario: Number(String(salario).replace(',', '.')) })
    });

    if (respuesta.ok) {
      limpiarFormulario(); // Limpiamos y reseteamos el estado
      obtenerEmpleados();  // Refrescamos la lista
      } else {
        console.error("El servidor respondió con error:", await respuesta.text());
    }
  } catch (error) {
    console.error("Error al guardar/actualizar:", error);
  }
};
  const eliminarEmpleado = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (respuesta.ok) {
        obtenerEmpleados();
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

// Sube los datos del empleado seleccionado al formulario
const prepararEdicion = (empleado) => {
  setNombre(empleado.nombre);
  setApellido(empleado.apellido);
  setCargo(empleado.cargo);
  setSalario(String(empleado.salario)); // Convertimos a texto para el input, de forma más segura
  setIdEdicion(empleado.id);
};

// Limpia el formulario y cancela la edición
const limpiarFormulario = () => {
  setNombre(''); setApellido(''); setCargo(''); setSalario('');
  setIdEdicion(null);
};
  
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.titulo}>
        Registro de Empleados
      </Text>

      {/* SECCIÓN DEL FORMULARIO */}
      <Card style={styles.cardForm}>
        <Card.Content>
          <TextInput
            label="Nombre"
            value={nombre}
            onChangeText={setNombre}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Apellido"
            value={apellido}
            onChangeText={setApellido}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Cargo"
            value={cargo}
            onChangeText={setCargo}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Salario"
            value={salario}
            onChangeText={setSalario}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={guardarEmpleado}
            icon="account-plus"
            style={styles.boton}
          >
            Guardar Empleado
          </Button>
          {idEdicion && (
  <Button mode="outlined" onPress={limpiarFormulario} style={{ marginTop: 10 }}>
    Cancelar Edición
  </Button>
)}

        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      {/* SECCIÓN DE LA LISTA */}
      <Text variant="titleLarge" style={styles.subtitulo}>
        Nómina Actual
      </Text>
      {cargando ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={empleados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.cardEmpleado}>
              <Card.Title
                title={`${item.nombre} ${item.apellido}`}
                subtitle={item.cargo}
                right={() => <Text style={styles.precio}>${item.salario}</Text>}
              />
          <Card.Actions>
              <Button icon="pencil" textColor="#1976d2" onPress={() => prepararEdicion(item)}>
              Editar
            </Button>
            <Button icon="delete" textColor="#f5f4f4" onPress={() => eliminarEmpleado(item.id)}>
              Eliminar
            </Button>
          

          </Card.Actions>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f2f5" },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#6200ee",
  },
  subtitulo: { marginBottom: 10, fontWeight: "bold" },
  cardForm: { marginBottom: 20, elevation: 4 },
  input: { marginBottom: 10 },
  boton: { marginTop: 10 },
  divider: { marginVertical: 20 },
  cardEmpleado: { marginBottom: 10, backgroundColor: "#fff" },
  precio: {
    marginRight: 15,
    fontWeight: "bold",
    color: "#2e7d32",
    fontSize: 16,
  },
});
