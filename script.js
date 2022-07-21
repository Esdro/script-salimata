/**
 * script.js - Script de la page
 */

/*************************/
/*       Questions       */
/*************************/

const questions = [
  {
    // Texte de la question
    question:
      "Dans la saga culte Star Wars, comment s'appelle le père de Luke Skywalker ?",
    // Réponses possibles
    answers: [
      "Darth Vader",
      "Anakin Skywalker",
      "Les deux réponse",
      "Aucune réponse",
    ],
    // Index de la réponse correcte
    correctAnswerIndex: 2,
  },
  {
    question:
      'En quelle année le groupe "The Beatles" a t\'il sorti le célèbre album "Sgt. Pepper\'s Lonely Hearts Club Band" ?',
    answers: ["1967", "1974", "1962", "1980"],
    correctAnswerIndex: 0,
  },
  {
    question:
      'Dans la série de jeux video "Zelda", quel est le nom du personnage principal qu\'incarne le joueur ?',
    answers: ["Zelda", "Ganon", "Tom", "Link"],
    correctAnswerIndex: 3,
  },
  {
    question:
      "Quel est le nom de la mission spatiale lunaire, menée par la NASA, dont l'équipage a du annuler son allunissage suite à une explosion pendant le voyage ?",
    answers: ["Apollo 9", "Mercury 1", "Apollo 13", "Gemini 2"],
    correctAnswerIndex: 2,
  },
];

/********* NE PAS MODIFIER AU DESSUS DE CETTE LIGNE *********/

/*************************/
/* Contenu du DOM chargé */
/*************************/
document.addEventListener("DOMContentLoaded", () => {
  // A FAIRE: Compléte le code pour faire fonctionner le quizz, pour plus d'informations consulte le sujet

  
  /**
   * 1 : Prémièrement, je stocke le premier objet du tableau questions avec toutes ses propriétes : @currentQuestion; @currentAnswers; @currentAnswerIndex; je récupère aussi la prémière section qui contiendra les questions réponses @question;
   */
  var question = document.querySelector('#question');
  var currentQuestion = questions[0].question;
  var currentAnswers = questions[0].answers;
  var currentAnswerIndex = questions[0].correctAnswerIndex;

  /**
   * 2 : j'injecte la prémière question  ( le premier objet du tableau questions bien-sûr) 
   */
  question.textContent = currentQuestion;

/**
 * 3 : je parcours le tableau des possibles réponses ( le premier objet du tableau questions bien-sûr) et pour chaque élément réponse dans le tableau, je crée ul li pour le stocker. puis j'injecte tous les li dans le ul #answers.
 */
  currentAnswers.forEach(answer => {
    let li = document.createElement('li');
    li.className = "answer";
    li.textContent = answer;
    document.querySelector('#answers').appendChild(li);
  });
  /**
   * 4: je crée un span caché où je mets l'index de la réponse : cela est utilie pour pouvoir comparer après et augmenter le score. le span est injecté dans le container de question
   */
  let span = document.createElement('span');
  span.className = "scoreIndex"; 
  span.hidden = true;
  span.innerText = currentAnswerIndex;
  document.querySelector('.question-container').appendChild(span);
  /**
   * 5: j'ajoute une classe active au question-container pour mieux montrer que c'est lui qui est actuelement visible dans l'écran. 
   */
  document.querySelector('.question-container').classList.add('active');

  /**
   * 6: maintenant que j'ai déjà une question disponible sur l'écran, je vais boucler sur le tableau questions en commençant à la position 1; c'est à dire le question-container qui est déjà affiché n'est plus dans ma boucle. 
   * 
   * 
   * à chaque question trouvé, je crée une section qui contiendra : un p pour la question de la question sur laquelle nous sommes ( rappelez-vous que c'est une boucle ); un ul pour contenir les possibles réponses qui sont chacune dans un li; et enfin un span pour contenir l'index de la bonne réponse.
   * 
   * 
   * 
   * suivez bien la partie; on aura donc trois sections qui auront des contenus identiques au premier section déjà affichée. 
   * 
   * ensuite on insère tous ces sections avant la section .resultat container. 
   */
  for (let index = 1; index < questions.length; index++) {
    const element = questions[index];

    let qContainer = document.createElement('section');
    qContainer.className = "question-container";

    let p = document.createElement('p');
    p.id = 'question';
    p.textContent = element.question;

    let ul = document.createElement('ul')
    ul.id = "answers";

    let answers = element.answers;
    answers.forEach(answer => {
      let li = document.createElement('li')
      li.className = "answer";
      li.textContent = answer;
      ul.appendChild(li);
    });
    let span = document.createElement('span');
    span.className = "scoreIndex"; 
    span.hidden = true;
    span.innerText = element.correctAnswerIndex;

    qContainer.appendChild(ul)
    qContainer.insertBefore(p, ul);
    qContainer.appendChild(span);

    //console.log(qContainer);
    document.querySelector('.main-container').insertBefore(qContainer, document.querySelector('.result-container'))
  }


/**
 * vous êtes d'accord avec moi qu'après la boucle et chargement de la page; on aura 4 sections avec la classe .question-container au total ??????
 * 
 * donc du coup cela nous intéresse et on va boucler sur ces sections. 
 * 
 */


/**
 * ici quelques variables de bases
 */
  var questionContainerIndex = 0;
  var score = document.getElementById('score');


  /**
   * je récupère donc toutes les sections qui ont pour class question-container
   */

  var questionContainers = document.querySelectorAll('.question-container');

  /**
   * cette fonction permet donc de cacher toutes les sections question-container après la prémière; c'est pourquoi en bouclant j'ai commencé à ; et tous le reste a pris un display "none"; donc cachée
   */
  var hideQuestionContainer = () => {
    doAction();
    for (let index = 1; index < questionContainers.length; index++) {
      const QuestionContainer = questionContainers[index];
      QuestionContainer.style.display = "none"
    }

  }
/**
 * très bien : je récupère dans un tableau tous les li disponibles sur l'écran; quand je dis li je parle des possibles réponses
 * 
 * je vais boucler sur le tableau obtenu 
 */
  let answers = document.querySelectorAll(" section.question-container .answer");

  function doAction() {
    /**
     * je boucle
     */
    answers.forEach(answer => {
      /**
       * j'écoute ici chaque click sur chacune des possibles bonnes réponses
       */
      answer.addEventListener('click', (e) => {
        /**
         * e.target pour faire référence    à l'évènement en cour et non autre      */
        doAction2(e.target);
        /**
         * j'incrémente questionContainer pour qu'il affiche la prochaine question-container
         */
        let nextQuestionContainer = questionContainerIndex + 1
        showQuestionContainer(nextQuestionContainer)
      })

    })

  }
  
  /**
   * cette fonction a pour but, à chaque click sur les réponses, de augmenter le score ou pas.
   */
  function doAction2(element) {
/**
 * parent pour récupérer le parent de l'élément
 */
    let Parent = element.parentNode;

/**
 * grandparent1 pour récupérer le grandparent de l'élément. je pouvais simplifier le code
 */
    let grandParent1 = Parent.parentNode;

    /**
     * je récupère l'index de l'élément dans la sa famille. 
     */
    const index = Array.from(
      Parent.children

      ).indexOf(element);

      /**
     * je récupère le contenu du span qui est juste en dessous de l'élément. 
     */
      let cu = grandParent1.children[2].textContent;

      /**
       * si l'index de l'élément est égal au contenu du span : je regarde d'abord est-ce que le score n'est pas déjà à 4, si oui je retourne directement sans rien faire; sinon je l'incrémente une fois.
       */
     if (index == cu) {
      if (score.textContent == 4) {
        return;
      }
      score.textContent++
     }
        
  }

  hideQuestionContainer();

  /**
   * 
   * @param {index} index la question à afficher
   * @returns void
   */
  var showQuestionContainer = (index) => {

    // si index est égal à la longueur du tableau contenant les sections; alors c'est qu'on a terminé. On va donc afficher un petit message et désactiver les réponses.
    if (index === questionContainers.length) {
      document.querySelector('#question').textContent = " Merci pour avoir répondu. C'est tout pour aujourd'hui ";
      document.querySelector('#answers').textContent = '  '; 
    }
    
// on affecte 0 ( valeur initiale dequestionContainerIndex)  à lastQuestionContainerIndex
    let lastQuestionContainerIndex = questionContainerIndex
// on récupère le reste de index divisé par la longueur de nos sections.
    index %= questionContainers.length

    questionContainerIndex = index // ( le reste de la division précédente)

    // Cacher l'ancien QuestionContainer
    questionContainers[lastQuestionContainerIndex].style.display = "none "; // la section à la position 0;
    questionContainers[lastQuestionContainerIndex].classList.remove("active");

    // Affichage du QuestionContainer correspondant à l'indice reçu en paramètre
    questionContainers[questionContainerIndex].style.display = "block";  // la section à la positon 1 donc 
    questionContainers[questionContainerIndex].classList.add("active");

  }

});

