# Sistemas Monolíticos

### O que é uma aplicação monolítica
- Aplicações "tradicionais"
- Tudo em um
- **Única unidade de deployment**. Para o deploy do module de produtos o módulo de vendas também tem que ir junto.
  
#### Polêmica por trás das aplicações monolíticas
- Aplicações da década passada
- Ultrapassada
- Não escalam
- Impedem o crescimento do negócio
- Alto acoplamento

**Grande parte dos argumentos são: FALSOS**

#### Quando utilizar monolitos pode ser uma boa
- Novos projetos onde o modelo de negócio não está claro
- Instabilidade no core do negócio
- Evitar complexidade no processo de deploy
- Evitar complexidade na operação

**95% das vezes, utilizar sistemas monolíticos é a melhor opção**

#### Tipos de sistemas monolíticos
- Single process
- Monolitos distribuidos
- Black box

Newman, Sam. Monolith to Microservices (p. 21). O'Reilly Media.

**Single process**
![](./.github/single_process.png)

- Alto acoplamento. (Dependencia forte entre classes/modulos)
- Modular
- Modular com bancos de dados segregados

**Vamos pensar em longo prazo com "User"**

De uma forma ou de outra tudo se relaciona com User

User| - 
---|---
Dados pessoais | Email mkt
Endereços| Campanhas
Cartões de crédito| Favoritos
Tickets de suporte| Lista de casamento
Compras| Historico de login
Carrinho abandonado| Lista de preferencias de emails
Devoluções| Avaliação de produtos
Financiamento| CRM
Indicações| Propostas
Reclamações| Lances / Leilão
Cartão de Pontos |

#### Principais problemas com essa abordagem

- Não existe contexto
- Entidades que se relacionam
- Não há divisão. Tudo faz parte de tudo. Tudo grudado em tudo
- Efeitos colateriais indesejados

**Precisamos evitar isso!**

#### DDD é um ponto de partida

Contextos
- Catálogo [user]
- Carrinho [user]
- Checkout [user]
- Pagamentos [cliente]
- Suporte ao Cliente [cliente]
- Marketing [lead]
- Programa de pontos [beneficiario]
- Lista de casamento [convidado]

![](.github/modules_monolith.png)

#### Sistemas monolíticos modulares
- Módulos quebrados em "bounded contexts"
- Conversam através de contratos e façades
- Entidades podem ser "duplicadas" tendo apenas os atributos necessários
- Equipes especializadas por módulos
- Alta coesão: O que muda junto, permanece junto.

#### Sistemas monolíticos modulares com bancos segregados
![](.github/modules_monolith_database_segregation.png)