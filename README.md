### [Vue JS 2 - The Complete Guide](https://www.udemy.com/vuejs-2-the-complete-guide/)

Notas de estudo + Códigos das aplicações desenvolvidas

## | [Projeto 1](https://goo.gl/V9A5A5) | [Projeto 2](#) | [Projeto 3](#) |
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

* Acessando uma instância VueJS externamente: É possível acessar propriedades e métodos de uma diferente instância
VueJS, tanto dentro de outra instância quanto em *plain Javascript*, desde que a instância seja declarada com um nome.
No exemplo abaixo a instância é armazenada na `var vm1`.

```
var vm1 = new Vue({
    ...
    data: {
      name: 'Foo'
    }
    ...
  });

setTimeout(function(){
  vm1.name = 'Bar';
  }, 5000);
```

## Components

* Ao registrar um novo componente, a propriedade `data` deve ser uma **função** que retorne um novo objeto.
Este novo objeto será o grupo de valores de `data` especificamente.

```
<div id="app">
  <component-name />
</div>

Vue.component('component-name', {
  data: function() {
    return {
      name: 'Foo',
      age: '20'
    }
  };
});

new Vue({
    el: '#app'
});
```

* O envio de props para componentes filhos é semelhante ao React e React Native. Primeiro, é necessário
fazer o *bind* de que propriedade do objeto **data** deve ser enviado, e então declarar uma propriedade **com o mesmo nome** em um array chamado **props** no componente filho.

```
//Componente Pai
  data: () => {
    return {
      name: 'Foo'
    };
  }

//Template do componente pai, que faz uso de um componente filho chamado `child-component`
//O v-bind (shorthand [:]) conecta a propriedade com o fragmento do objeto `data`
<div>
  <child-component :name="name"/>
</div>

//Componente filho
export default {
  props: ['name']
}

//Template do componente filho, que exibe o valor recebido na prop `name`
//O valor será `Foo`
<div>
<p>Hello, my name is {{ name }}</p>
</div>  
```

* Para validar um ou mais tipos de props, ao invés de fazer o uso de um array, usa-se um objeto.
Caso seja necessário especificar mais de um tipo, esses tipos são passados em um array.

```
export default {
  props: {
    name: String,
    age: [String, Integer]
  }
}
```

* Ainda é possível refinar ainda mais esta estrutura, definindo se a propriedade é obrigatória ou se
existe um valor *default*

```
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Integer,
      default: 20
    }
  }
}
```

* Para enviar valores de um componente filho para um componente pai, é necessário usar **$emit()**.
O método **$emit()** pertence ao VueJS e é responsável por propagar eventos. Seus parâmetros são:
**$emit(nomeDoEvento, dados)**. O nome do evento é definido pelo desenvolvedor.

Já no componente pai deve ser adicionado um *listener* para aquele evento, assim como o que deve ser executado
ao receber o mesmo.

```
//Componente filho chamado `child-component`
<button @click="changeName"></button>

export default {
  props: {
    name: String
  },
  methods: {
    changeName() {
      this.name = 'Bar'
      this.$emit('nameWasReset', this.name)
    }
  }
}

//Componente pai
export default {
  data: () => {
    return {
      name: 'Foo'
    };
  }
}

//$event é o valor enviado pelo evento no momento da sua emissão (this.name do componente child-component)
<child-component  :name="name" @nameWasReset="name = $event" />
<p>Name in memory: {{ name }}</p>

//O valor inicial do parágrafo acima é 'Foo'. Ao clicar no botão que dispara o evento 'changeName()'
//no componente filho, este valor é alterado para 'Bar'
```
