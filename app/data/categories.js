import privody_vozdushnye from './privody-vozdushnye';
import privody_dymovye from './privody-dymovye';
import privody_protivopozharnye from './privody-protivopozharnye';
import example from './example';

export default [

        {
                listName: 'электроприводы', 
                displayName: 'Электропривод', 
                content: [...privody_protivopozharnye, ...privody_dymovye, ...privody_vozdushnye],
                image: {}, 
                subCategories: [
                        {
                                listName: 'для противопожарных клапанов', 
                                displayName: 'Электропривод механический', 
                                image: {}, 
                                content: [...privody_protivopozharnye],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'для дымовых клапанов', 
                                displayName: 'для дымовых клапанов КЛАПАНОВ', 
                                image: {}, 
                                content: [...privody_dymovye],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'для воздушных клапанов', 
                                displayName: 'Электропривод', 
                                image: {}, 
                                content: [...privody_vozdushnye],
                                subCategories: [
                                        {}, 
                                        {}]
                        }
                ]
        },

        {
                listName: 'воздушные клапаны', 
                displayName: 'Воздушный клапан', 
                image: {}, 
                content: [...example],
                subCategories: [
                        {
                                listName: 'АВК', 
                                displayName: 'АВК', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'УВК', 
                                displayName: 'УВК', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }
                ]
        },

        {
                listName: 'противопожарные клапаны', 
                displayName: 'ПРОТИВОПОЖАРНЫЙ КЛАПАН', 
                image: {}, 
                content: [...example],
                subCategories: [
                        {
                                listName: 'МСУ', 
                                displayName: 'МСУ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'нержавеющие', 
                                displayName: 'НЕРЖАВЕЮЩИЙ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'многомтворчатые', 
                                displayName: 'МНОГОСТВОРЧАТЫЙ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }
                ]
        },

        {
                listName: 'взрывозащищенные клапаны', 
                displayName: 'ВЗРЫВОЗАЩИЩЕННЫЙ КЛАПАН', 
                image: {}, 
                content: [...example],
                subCategories: [
                        {
                                listName: 'противопожарные', 
                                displayName: 'ПРОТИВОПОЖАРНЫЙ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'УВК ЕХ', 
                                displayName: 'УВК ЕХ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'АЗЕ', 
                                displayName: 'АЗЕ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'АЗД', 
                                displayName: 'АЗД', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }
                ]
        },

        {
                listName: 'шкафы автоматизации', 
                displayName: 'Шкаф', 
                image: {}, 
                content: [...example],
                subCategories: [

                        {
                                listName: 'шкафы автоматизации противодымной вентиляции', 
                                displayName: 'ШКАФ АВТОМАТИЗАЦИИ ПРОТИВОДЫМНОЙ ВЕНТИЛЯЦИИ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 

                        {
                                listName: 'управление вентиляторами дымоудаления/подпора воздуха', 
                                displayName: 'УПРАВЛЕНИЕ ВЕНТИЛЯТОРАМИ ДЫМОУДАЛЕНИЯ/ПОДПОРА ВОЗДУХА', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        },

                        {
                                listName: 'управление вентиляторами подпора воздуха и электронагревателем', 
                                displayName: 'УПРАВЛЕНИЕ ВЕНТИЛЯТОРАМИ ПОДПОРА ВОЗДУХА И ЭЛЕКТРОНАГРЕВАТЕЛЕМ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        },

                        {
                                listName: 'пульт диспетчера', 
                                displayName: 'Пульт диспетчера', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }
                ]
        },

        {
                listName: 'вентиляторы', 
                displayName: 'Вентилятор', 
                image: {}, 
                content: [...example],
                subCategories: [
                        {
                                listName: 'ДУ', 
                                displayName: 'ВЕНТИЛЯТОР ДУ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'ПД', 
                                displayName: 'ВЕНТИЛЯТОР ПД', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'осевые', 
                                displayName: 'ВЕНТИЛЯТОР ОСЕВОЙ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'пылевые', 
                                displayName: 'ВЕНТИЛЯТОР ПЫЛЕВОЙ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'ВКР крышные', 
                                displayName: 'ВЕНТИЛЯТОР ВКР КРЫШНЫЙ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }
                ]
        },

        {
                listName: 'элементы монтажа', 
                displayName: '', 
                image: {}, 
                content: [...example],
                subCategories: [
                        {
                                listName: 'компенсаторы линейных расширений', 
                                displayName: 'КОМПЕНСАТОР ЛИНЕЙНЫХ РАСШИРЕНИЙ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'узлы прохода', 
                                displayName: 'УЗЕЛ ПРОХОДА', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'стаканы монтажные', 
                                displayName: 'СТАКАН МОНТАЖНЫЙ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'решетки РДКМ', 
                                displayName: 'РЕШЕТКА РДКМ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'решетки фасадные', 
                                displayName: 'РЕШЕТКА ФАСАДНАЯ', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }, 
                        {
                                listName: 'дефлекторы', 
                                displayName: 'ДЕФЛЕКТОР', 
                                image: {}, 
                                content: [...example],
                                subCategories: [
                                        {}, 
                                        {}]
                        }
                ]
        }

];






