import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Divider from "./component/ui/Divider";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
  });

  const fetchData = () => {
    axios
      .get("http://10.0.2.2:5000/api/data")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    const newData = { ...formData };

    if (newData.name === "") {
      return;
    }

    axios
      .post("http://10.0.2.2:5000/api/data", newData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        fetchData();
        setFormData({ name: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTaskDelete = (id) => {
    axios
      .delete(`http://10.0.2.2:5000/api/data/${id}`)
      .then((response) => {
        console.log(response.data.message);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ImageBackground
      source={require("./assets/mgb8.jpg")}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.header}>TASK TRACKER</Text>
        <View style={styles.listContainer}>
          <View style={styles.loadingContainer}>
            {isLoading ? (
              <Text style={styles.loadingText}>Loading data...</Text>
            ) : (
              <Text style={styles.loadingText}>TO-DO:</Text>
            )}
            <Divider />
          </View>
          {data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Button title="x" onPress={() => handleTaskDelete(item.id)} />
                </View>
              )}
            />
          ) : null}
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange("name", text)}
            value={formData.name}
            placeholder="enter anything here"
          />
          <Button title="Add Task" onPress={handleClick} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 20,
    top: -15,
    marginBottom: 10,
    textAlign: "center",
    color: "rgb(246,246,246)",
  },
  listContainer: {
    marginBottom: 10,
  },
  loadingContainer: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: "rgb(50,50,50)",
    color: "rgb(246,246,246)",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    color: "rgb(50,50,50)",
    color: "rgb(246,246,246)",
  },
  input: {
    marginTop: 10,
    width: 200,
    height: 40,
    backgroundColor: "rgb(246,246,246)",
    borderColor: "rgb(246,246,246)",
    borderWidth: 1,
    padding: 5,
    width: "full",
    borderRadius: 5,
    marginBottom: 2,
  },
});
