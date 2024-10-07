# Readme for the Machine Learning steps

## Estrutura de pastas da aba de Machine Learning
- example_data: Contém um exemplo de csv e mseed que usamos. Para os dados totais usados no treinamento do modelo, fizemos a concatenação de todos os csv/mseed da pasta "Training", gerando uma tabela com cerca de 17-19GB, não sendo possível fazer upload direto dela
- model: Contém o melhor modelo gerado pela nossa rede neural feita com a biblioteca Keras, usado em todos os notebooks que têm algum código de evaluation.
- test_datasets_output_catalog: Esta pasta contém os catálogos de dados exigidos pelo desafio, a descrição de todos os campos utilizados estão no arquivo [neural_network_evaluate.ipynb](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/neural_network_evaluate.ipynb)
- utils: pasta de extração de features matemáticas utilizadas para complementar todos os dados já fornecidos pela NASA, estes dados são passados para o modelo durante seu treinamento.

# Notebooks criados:
- No notebook [Lunar_test_data_extraction](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/Lunar_test_data_extraction.ipynb) temos a extração dos dados da pasta lunar/test
- No notebook [Lunar_train_data_extraction](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/Lunar_train_data_extraction.ipynb) temos a extração dos dados da pasta lunar/train
- No notebook [Mars_test_data_extraction](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/Lunar_test_data_extraction.ipynb) temos a extração dos dados da pasta mars/test
- No notebook [Mars_train_data_extraction](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/Lunar_train_data_extraction.ipynb) temos a extração dos dados da pasta mars/train
- No notebook [api_function](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/api_function.ipynb) temos uma função usada em nosso website, permitindo o usuário a fazer uma predição customizada a partir de um arquivo csv e o um valor de sampling_rate.
- No notebook [neural_network_evaluate](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/neural_network_evaluate.ipynb) temos a avaliação da nossa rede neural, onde os catálogos de output são gerados usando os dados obtidos nos notebooks [Lunar_test_data_extraction](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/Lunar_test_data_extraction.ipynb) e [Mars_test_data_extraction](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/Lunar_test_data_extraction.ipynb)
- No notebook [neural_network_training](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/neural_network_training.ipynb) temos o carregamento dos dados de treinamento criados a partir dos notebooks [Lunar_train_data_extraction](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/Lunar_train_data_extraction.ipynb) e [Mars_train_data_extraction](https://github.com/joaopedrocosso/quakeMeBabyOneMoreTime/blob/main/machine-learning/Lunar_train_data_extraction.ipynb), junto com a criação da nossa rede neural e sua avaliação.

# Métricas do modelo de Rede Neural
