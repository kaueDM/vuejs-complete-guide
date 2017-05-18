### [Vue JS 2 - The Complete Guide](https://www.udemy.com/vuejs-2-the-complete-guide/)

Notas de estudo + Códigos das aplicações desenvolvidas

## | [Projeto 1](#) | [Projeto 2](#) | [Projeto 3](#) |
> Os links serão atualizados no momento de criação dos projetos dentro desde repositório



*  A notação `{{  }}` chama-se [*string interpolation*](https://en.wikipedia.org/wiki/String_interpolation) 

* A instância do Vue JS armazena internamente o código HTML que está conectada a ela, usando este código para 
gerar seu template, que será exibido no navegador. O código escrito em HTML durante o desenvolvimento **não é o mesmo**
renderizado no navegador. São duas coisas distintas, unidas pelo **Vue JS**

* Métodos e propriedades podem ser acessadas no template chamando-as diretamente pelo nome
```
//VueJS data object
  data: {
  	name: 'Foo'
  }

//Template
<h1>My name is {{ name }}</h1>
```

* Graças a arquitetura interna do framework, é possível acessar dentro da instância do VueJS métodos e propriedades
utilizando `this`, mesmo que não façam parte do mesmo contexto

```
new Vue({
	el: '#app',
  data: {
  	name: 'Foo'
  },
  methods: {
  	sayMyName: function() {
    	return this.name;
    }
  }
});

```

* As *string interpolations* **NÃO** podem ser utilizadas dentro de elementos HTML, devendo ser feito o uso de diretivas.

* Caso uma propriedade tenha seu valor alterado durante a execução, todos os elementos dependentes desta propriedade serão renderizados
novamente, aplicando o novo valor

* **v-once** - 'trava' a renderização de determinada propriedade para seu estado inicial, ou seja, caso o valor seja alterado posteriormente
durante a execução, um elemento sob efeito de **v-once** não será re-renderizado

```
//VueJS instance
...
    data: {
        name: 'Foo'
    },
    methods: {
        updateName: function() {
            return this.name = 'Bar';
        }
    }
...

//Template
<h1 v-once>{{ name }}</h1> //Exibe o valor inicial de 'name', 'Foo'
<p>{{ updateName() }}</p> //Exibe o valor modificado de 'name', 'Bar'
```

* *Raw Rendering*: Por padrão, o VueJS **NÃO** renderiza qualquer tipo de conteúdo HTML inserido em propriedades ou como resultado de métodos.
Caso tal ação seja necessária, é feito o uso da diretiva **v-html**, que permite a injeção de tags HTML no template

```
//VueJS data object
    data: {
        myLink: '<a href="http://google.com">Google!</a>'
    }

//Template
    <p v-html='myLink'></p>
``` 

* **v-on** - Listener de eventos do DOM

```
//VueJS instance
data: {
    counter: 0
},
methods: {
    add: function() {
        this.counter++;
    }
}
<button v-on:click="add">Add One</button>
<p>{{ counter }}</p>
```




