PennController.ResetPrefix(null)

// ─── SEQUÊNCIA GERAL ──────────────────────────────────────────────────────────
Sequence("welcome", "Instruction2", "Instruction2b", "START", "treino", randomize("experimental"), "send", "final")

// ─── WELCOME ─────────────────────────────────────────────────────────────────
newTrial("welcome",
    newText("Olá").print()
    ,
    newText("Você está sendo convidado a participar de um experimento psicolinguístico sobre o processamento de frases.").print()
    ,
    newText("A sua tarefa será ler frases na tela do computador, julgar se fazem sentido e identificar se a última palavra é igual a de duas frases antes ou não.").print()
    ,
    newText("O experimento leva cerca de 15 minutos.").print()
    ,
    newText("Não se preocupe, pois você vai ler as instruções detalhadas e fará um treino antes de começar o teste.").print()
    ,
    newButton("CONTINUAR").center().css("font-size", "1.2em").print().wait()
)

// ─── INSTRUCTION 2 (coleta de dados) ─────────────────────────────────────────
newTrial("Instruction2",
    newText("atencao",
        "<strong>ATENÇÃO: Este experimento só funciona corretamente se realizado em um computador. Por favor, não continue se estiver em um dispositivo móvel.</strong>")
        .print()
    ,
    newText("Por favor, escreva aqui seu email:").print()
    ,
    newTextInput("email").css("font-size", "1.2em").print()
    ,
    newText("Por favor, escreva a sua idade").print()
    ,
    newTextInput("idade").css("font-size", "1.2em").print()
    ,
    newText("Selecione com qual mão você escreve:").print()
    ,
    newDropDown("Lateralidade", "")
        .css("font-size", "1.2em")
        .add("Canhoto", "Destro", "Não específico")
        .print()
    ,
    newText("GÊNERO:").print()
    ,
    newDropDown("Genero", "")
        .css("font-size", "1.2em")
        .add("Feminino", "Masculino", "Não específico")
        .print()
    ,
    newText("Agora selecione sua ESCOLARIDADE na caixa abaixo:").print()
    ,
    newDropDown("Escolaridade", "")
        .css("font-size", "1.2em")
        .add(
            "Ensino Básico Incompleto",
            "Ensino Básico Completo",
            "Ensino Médio Regular",
            "Ensino Superior em Curso",
            "Ensino Superior Completo",
            "Pós-Graduação"
        )
        .print()
    ,
    newText("Participante com TDAH:").print()
    ,
    newDropDown("TDAH", "")
        .css("font-size", "1.2em")
        .add("Sim", "Não")
        .print()
    ,
    newText("Agora vamos ao Experimento.").print()
    ,
    newText("<p>").print()
    ,
    newText("Por favor, leia as instruções com calma e siga o tutorial.").print()
    ,
    newText("Não se preocupe, pois você vai fazer um PRACTICE antes do TEST em si.").print()
    ,
    newText("Como você é falante de língua inglesa, a partir deste momento, vamos trocar para o Inglês.").print()
    ,
    newText("<p>").print()
    ,
    newButton("NEXT")
        .print()
        .css("font-size", "1.2em")
        .wait()
)

// ─── EXEMPLO (Instruction2b) ──────────────────────────────────────────────────
newTrial("Instruction2b",
    defaultText.print().css("font-size", "1em")
    ,
    newText("<strong>EXAMPLE — How the task works</strong>")
    ,
    newText("─────────────────────────────────────")
    ,
    newText("<strong>STEP 1 —</strong> A hashtag mask appears on screen:")
    ,
    newText("######")
    ,
    newText("<strong>STEP 2 —</strong> A first word (Prime 1) appears. Read it carefully and <strong>press SPACE</strong> when done.")
    ,
    newText("SON")
    ,
    newText("<strong>STEP 3 —</strong> A second word (Prime 2) appears. Read it and <strong>press SPACE</strong> when done.")
    ,
    newText("CON")
    ,
    newText("<strong>STEP 4 —</strong> A third word (Target) appears. Read it and <strong>press SPACE</strong> when done.")
    ,
    newText("BAN")
    ,
    newText("<strong>STEP 5 —</strong> A question mark <strong>?</strong> appears. Judge whether the <strong>Target (BAN)</strong> is the same as <strong>Prime 1 (SON)</strong>:")
    ,
    newText("→ Press <strong>J</strong> if they ARE the same &nbsp;|&nbsp; Press <strong>F</strong> if they are NOT")
    ,
    newText("In this example BAN ≠ SON, so press <strong>F</strong>.")
    ,
    newText("─────────────────────────────────────")
    ,
    newText("<strong>STEP 6 —</strong> The question <strong>Make sense?</strong> appears.")
    ,
    newText("Judge whether the sequence of words made sense:")
    ,
    newText("→ Press <strong>F</strong> for <strong>Yes</strong> &nbsp;|&nbsp; Press <strong>J</strong> for <strong>No</strong>")
    ,
    newText("─────────────────────────────────────")
    ,
    newButton("CONTINUE")
        .print()
        .css("font-size", "1.2em")
        .wait()
)

// ─── START (instrução pré-treino) ─────────────────────────────────────────────
newTrial("START",
    newText("Now that you understand the task, let's PRACTICE.")
        .print()
        .css("font-size", "1.2em")
    ,
    newText("Remember:").print().css("font-size", "1.2em")
    ,
    newText("• SPACE → advance to the next word").print().css("font-size", "1em")
    ,
    newText("• J / F → answer the questions").print().css("font-size", "1em")
    ,
    newButton("START PRACTICE")
        .print()
        .css("font-size", "1.2em")
        .wait()
)

// ─── TREINO ───────────────────────────────────────────────────────────────────
// Arquivo: treino_frases_pcibex.csv (pasta resources)
// Colunas: FullSentence | Prime1 | Prime2 | Target
// Prime1 = antepenúltima palavra da frase
// Prime2 = penúltima palavra da frase
// Target = última palavra da frase
Template("treino_frases_pcibex.csv", row =>
    newTrial("treino",

        defaultText
            .center()
            .print("center at 50vw", "middle at 50vh")
            .log()
        ,
        defaultTimer.log().start().wait()
        ,

        // ── Máscara 700ms ──────────────────────────────────────────────────
        newText("mask", "######"),
        newTimer("maskTimer", 700),
        getText("mask").remove()
        ,

        // ── Prime 1 — aguarda SPACE, RT registrado ─────────────────────────
        newText("prime1", row.Prime1),
        newKey("answerPrime1", " ").log().wait(),
        getText("prime1").remove()
        ,

        // ── SOA 50ms ──────────────────────────────────────────────────────
        newText("SOA", " "),
        newTimer("SOATimer", 50),
        getText("SOA").remove()
        ,

        // ── Prime 2 — aguarda SPACE, RT registrado ─────────────────────────
        newText("prime2", row.Prime2),
        newKey("answerPrime2", " ").log().wait(),
        getText("prime2").remove()
        ,

        // ── Target — aguarda SPACE, RT registrado ──────────────────────────
        newText("target", row.Target),
        newKey("answerTarget", " ").log().wait(),
        getText("target").remove()
        ,

        // ── Same / Different? (? → J = same | F = different) ──────────────
        newText("question", "?"),
        newKey("answerQuestion", "FJ").log().wait(),
        getText("question").remove()
        ,

        // ── Make sense? (F = Yes | J = No), RT registrado ─────────────────
        newText("senseprompt", "Make sense?"),
        newKey("answerSense", "FJ").log().wait(),
        getText("senseprompt").remove()
        ,

        // ── Blank 700ms ────────────────────────────────────────────────────
        newText("blank", " "),
        newTimer("blankTimer", 700),
        getText("blank").remove()
    )
)

// ─── EXPERIMENTAL ─────────────────────────────────────────────────────────────
Template("ExpA_randomizado.csv", row =>
    newTrial("experimental",

        defaultText
            .center()
            .print("center at 50vw", "middle at 50vh")
            .log()
        ,
        defaultTimer.log().start().wait()
        ,

        // ── Máscara 700ms ──────────────────────────────────────────────────
        newText("mask", "######"),
        newTimer("maskTimer", 700),
        getText("mask").remove()
        ,

        // ── Prime 1 — aguarda SPACE, RT registrado ─────────────────────────
        newText("prime1", row.Prime1),
        newKey("answerPrime1", " ").log().wait(),
        getText("prime1").remove()
        ,

        // ── Prime 2 — aguarda SPACE, RT registrado ─────────────────────────
        newText("prime2", row.Prime2),
        newKey("answerPrime2", " ").log().wait(),
        getText("prime2").remove()
        ,

        // ── Target — aguarda SPACE, RT registrado ──────────────────────────
        newText("target", row.Target),
        newKey("answerTarget", " ").log().wait(),
        getText("target").remove()
        ,

        // ── Same / Different? (? → J = same | F = different) ──────────────
        newText("question", "?"),
        newKey("response", "FJ").log().wait(),
        getText("question").remove()
        ,

        // ── Make sense? (F = Yes | J = No), RT registrado ─────────────────
        newText("senseprompt", "Make sense?"),
        newKey("answerSense", "FJ").log().wait(),
        getText("senseprompt").remove()
        ,

        // ── Blank 700ms ────────────────────────────────────────────────────
        newText("blank", " "),
        newTimer("blankTimer", 700),
        getText("blank").remove()
    )
)

// ─── ENVIO DOS DADOS ──────────────────────────────────────────────────────────
SendResults("send")

// ─── FINAL ────────────────────────────────────────────────────────────────────
newTrial("final",
    newText("Thank you for participating! The experiment is now complete.")
        .print()
        .css("font-size", "1.2em")
)