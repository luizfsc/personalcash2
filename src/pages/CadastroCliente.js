import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Appbar, TextInput, Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Body from '../components/Body';
import Container from '../components/Container';
import Header from '../components/Header';
import Input from '../components/Input';

import { insertClientes, updateClientes} from '../services/ClientesServicesDB';

const CadastroCliente = ({navigation, route}) => {
  const { cliente } = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [apelido, setApelido] = useState('');
  const [telefone, setTelefone] = useState('');
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'));

  const handleCancel = () => {
    setNome('');
    setSobrenome('');
    setApelido('');
    setTelefone('');
    setData('');
  };

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setSobrenome(cliente.sobrenome);
      setApelido(cliente.apelido);
      setTelefone(cliente.telefone);
      setData(cliente.data);
    }
  }, [cliente]);

  const handleCalcular = () => {
    // Verificar se os campos estão vazios
    if (!nome || !sobrenome || !apelido || !telefone || !data ) {
      Alert.alert('Por favor, preencha todos os campos.');
      return; // Retorna se algum campo estiver vazio
    }

    if(cliente){

      updateClientes(
        {
          nome: nome,
          sobrenome: sobrenome,
          apelido: apelido,
          telefone: telefone,
          data: data,
          id: cliente.id
        }
      ).then();
      
    }else{
      insertClientes(
        {
          nome: nome,
          sobrenome: sobrenome,
          apelido: apelido,
          telefone: telefone,
          data: data
        }
      ).then();
    }

    navigation.goBack();
    };

  return (
    <Container>
      <Header title={'Cadastro de Cliente'} goBack={() => navigation.goBack()} />
      <Body>
        <Input
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <Input
          label="Sobrenome"
          value={sobrenome}
          onChangeText={(text) => setSobrenome(text)}
        />
        <Input
          label="Apelido"
          value={apelido}
          onChangeText={(text) => setApelido(text)}
        />
        <Input
          label="Telefone"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
          keyboardType="numeric" // Apenas números
        />
        {show &&(
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);
              setData(moment(date).format('DD/MM/YYYY'));
            }}
            />
        )}
        <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data do Cadastro"
            value={data}
            editable={false}
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonC}
            mode="contained"
            onPress={handleCancel}>
            Cancelar
          </Button>
          <Button
            style={styles.buttonR}
            mode="contained"
            onPress={handleCalcular}>
            Adicionar
          </Button>
        </View>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonR: {
    backgroundColor: 'green',
    marginTop: 5,
    flex: 1,
    marginLeft: 15,
  },
  buttonC: {
    backgroundColor: 'red',
    marginTop: 5,
    flex: 1,
    marginRight: 15,
  },
});

export default CadastroCliente;
