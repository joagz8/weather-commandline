const inquirer = require('inquirer')
require('colors')

//Configuración del menú
const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
        {
        value: 1,
        name: `${'1.'.green} Buscar ciudad`
    },
    {
        value: 2,
        name: `${'2.'.green} Historial`
    },
    {
        value: 0,
        name: `${'0.'.green} Salir`
    }
]
}]

//Mostrar menú e ingresar una opción
const inquirerMenu = async() => {
    console.log(`
    ================================
        Seleccione una opción
    ================================.
    `.green)

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion
}

//Pausar y ENTER para continuar
const pausa = async() => {
    const pausar = [{
        type: 'input',
        name: `Presionar ${'ENTER'.green} para continuar`
    }]
    console.log('\n');
    await inquirer.prompt(pausar)
    //return enter
}

//Leer el input ingresado en la opción
const leerInput = async(mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message: mensaje,
            validate(value){
                if (value.length === 0) {
                    return console.log("Por favor ingresa un valor");
                }
                return true
            }
        }
    ]
    const { descripcion } = await inquirer.prompt(question)
    return descripcion
}

const listarLugares = async( lugares = [] ) => {

    const choices = lugares.map( (lugar, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: lugar.id,
            name:  `${ idx } ${ lugar.city }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares
}