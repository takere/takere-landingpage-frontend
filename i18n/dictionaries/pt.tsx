import Link from "next/link";
import { href } from "../config";

const pt = {
  common: {
    nav: { home: "Início", research: "Pesquisa" },
    researchNav: {
      home: "Início",
      team: "Equipe",
      publications: "Publicações",
      gallery: "Galeria",
      contact: "Contato",
    },
    partners: "Em parceria com",
    stats: { students: "Estudantes", supervisions: "Orientações", publications: "Publicações" },
    footer: {
      contact: "Entre em contato",
      email: "Nosso e-mail",
      rights: "Takere © Todos os direitos reservados",
      policy: "Política de Privacidade",
      logoAlt: "takere: cuidado individualizado ao seu paciente",
    },
    skip: "Pular para o conteúdo principal",
    backToTop: "Voltar ao topo",
    openMenu: "Abrir menu de navegação",
    closeMenu: "Fechar menu",
  },

  seo: {
    keywords: [
      "Takere",
      "mHealth",
      "saúde digital",
      "plano de cuidado",
      "adesão ao tratamento",
      "monitoramento remoto de pacientes",
      "grupo de pesquisa",
      "UFRGS",
      "Instituto de Informática",
      "HCPA",
      "Hospital de Clínicas de Porto Alegre",
    ],
    ogAlt: "Takere: cuidado individualizado ao seu paciente",
    ogTagline: "Cuidado individualizado ao seu paciente",
    ogSubtitle: "Grupo de pesquisa em saúde digital · UFRGS + HCPA",
    organization:
      "Grupo de pesquisa do Instituto de Informática da UFRGS, em parceria com o HCPA, que desenvolve uma plataforma mHealth para personalização do plano de cuidado e engajamento de pacientes no tratamento.",
    pages: {
      home: {
        title: "Takere | Cuidado Individualizado ao seu Paciente",
        description:
          "Grupo de pesquisa do Instituto de Informática da UFRGS, em parceria com o HCPA, focado em manter pacientes engajados no tratamento com uma plataforma simples para personalização do plano de cuidado.",
      },
      research: {
        title: "Pesquisa | Takere",
        description:
          "Conheça o Takere Research Lab (UFRGS/HCPA): linhas de pesquisa em mHealth, IA, interfaces conversacionais, HL7/FHIR, privacidade de dados e adesão ao tratamento.",
      },
      team: {
        title: "Equipe | Pesquisa | Takere",
        description:
          "Coordenadores, membros e membros anteriores do grupo de pesquisa Takere, do Instituto de Informática da UFRGS, em parceria com o HCPA.",
      },
      publications: {
        title: "Publicações | Pesquisa | Takere",
        description:
          "Artigos, trabalhos de conclusão e outras publicações do grupo de pesquisa Takere sobre saúde digital e mHealth, organizados por ano.",
      },
      gallery: {
        title: "Galeria | Pesquisa | Takere",
        description: "Fotos do grupo de pesquisa Takere: eventos, apresentações e encontros da equipe da UFRGS e do HCPA.",
      },
      contact: {
        title: "Contato | Pesquisa | Takere",
        description:
          "Entre em contato com o grupo de pesquisa Takere: e-mail e endereço no Instituto de Informática da UFRGS, em Porto Alegre.",
      },
      policy: {
        title: "Política de Privacidade | Takere",
        description:
          "Política de privacidade da Takere: como coletamos, utilizamos e protegemos dados pessoais, em conformidade com a LGPD.",
      },
    },
  },

  home: {
    heroTitle: (
      <>
        Facilite o tratamento de seus pacientes com <strong>Takere</strong>
      </>
    ),
    heroText: (
      <>
        Somos um grupo de pesquisa com foco em ajudar a <b>equipe de saúde</b> a manter os{" "}
        <b>pacientes engajados no tratamento</b> com uma <b>plataforma simples para personalização do plano de cuidado.</b>
      </>
    ),
    cta: "Entre em contato",
    mission: (
      <>
        O nosso objetivo é fazer com que as informações do tratamento de pacientes cheguem a eles e melhorem
        <br />
        sua adesão ao tratamento
      </>
    ),
    offerTitle: "O que oferecemos?",
    offerImgAlt: "computador",
    howTitle: "Como funciona?",
    steps: [
      <>
        Equipes de saúde conseguem <b>montar facilmente</b> o plano de cuidado.
      </>,
      <>
        Paciente interage <b>em casa</b> com aplicativo montado <b>exclusivamente</b> para o seu plano de cuidado
      </>,
      <>
        Equipes de saúde conseguem <b>monitorar</b> e <b>intervir remotamente</b> no tratamento do paciente
      </>,
    ],
    screenAlts: [
      "interface de tratamento da takere",
      "aplicativo da takere para o paciente",
      "interface de monitoramento de pacientes da takere",
    ],
    researchTitle: "Pesquisa",
    researchText: (
      <>
        Nosso grupo de pesquisa está sediado no Instituto de Informática da{" "}
        <a href="https://www.ufrgs.br" target="_blank" rel="noopener noreferrer">
          Universidade Federal do Rio Grande do Sul
        </a>
        . Além disso, mantemos uma parceria constante com o{" "}
        <a href="https://www.hcpa.edu.br" target="_blank" rel="noopener noreferrer">
          Hospital de Clínicas de Porto Alegre
        </a>
        . Nossa pesquisa é interdisciplinar e conta com a participação de estudantes de informática e saúde, com o
        objetivo de estudar técnicas para melhorar o cuidado à saúde.
      </>
    ),
    researchMore: (
      <>
        Não deixe de <Link href={href("pt", "/research")}>ver mais detalhes sobre a nossa pesquisa</Link>. Se você é
        um estudante ou pesquisador e tem interesse em contribuir para a melhoria do cuidado à saúde,{" "}
        <Link href={href("pt", "/contact")}>junte-se à nossa equipe de pesquisa</Link>!
      </>
    ),
    teamTitle: "Equipe",
    teamText:
      "Nossa equipe surgiu com o sonho de construir a plataforma mais fácil para a construção e gerenciamento de aplicações mHealth sob medida. Buscando fazer com que o paciente se sinta acolhido no tratamento e a equipe de saúde tenha as ferramentas para se tornar mais ágil e flexível no tratamento remoto.",
  },

  research: {
    groupTitle: "Conheça o nosso grupo",
    groupText:
      "Nossa sede é no Instituto de Informática da Universidade Federal do Rio Grande do Sul. Mantemos uma parceria constante com o Hospital de Clínicas de Porto Alegre, e nossa pesquisa é interdisciplinar e conta com a participação de estudantes de informática e saúde, com o objetivo de estudar técnicas para melhorar o cuidado à saúde.",
    groupCta: "Conheça nossa equipe",
    groupAlt: "equipe da takere no hcpa",
    linesTitle: "Linhas de Pesquisa",
    linesIntro:
      "Nosso foco está em buscar soluções que melhorem a adesão e monitoramento do tratamento de pacientes por meio da tecnologia.",
    linesCurrent: "Atualmente, nosso foco de pesquisa está em:",
  },

  team: { coordinators: "Coordenadores", members: "Membros", former: "Membros anteriores" },

  publications: { title: "Publicações" },

  gallery: {
    title: "Galeria",
    photo: "Foto",
    labels: { close: "Fechar", prev: "Anterior", next: "Próxima" },
  },

  contact: {
    title: "Contato",
    info: "Mais informações",
    address: "Nosso endereço",
    general: "Para assuntos gerais, parcerias e dúvidas:",
    map: "Mapa: Instituto de Informática da UFRGS",
  },

  policy: {
    title: "Política de Privacidade",
    operated: "Este produto é mantido e operado por",
    intro:
      "Nós coletamos e utilizamos alguns dados pessoais que pertencem àqueles que utilizam nosso site, nossa plataforma para enfermeiros (HCP) e o nosso aplicativo para pacientes. Ao fazê-lo, agimos na qualidade de controlador desses dados e estamos sujeitos às disposições da Lei Federal n. 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD).",
    care: "Nós cuidamos da proteção de seus dados pessoais e, por isso, disponibilizamos esta política de privacidade, que contém informações importantes sobre:",
    topics: [
      "Quem deve utilizar nosso produto",
      "Quais dados coletamos e o que fazemos com eles;",
      "Seus direitos em relação aos seus dados pessoais; e",
      "Como entrar em contato conosco.",
    ],
    s1: "1. Quem deve utilizar nosso produto",
    s1Text:
      "Nosso site só deve ser utilizado por pessoas com mais de dezoito anos de idade. Sendo assim, crianças e adolescentes não devem utilizá-lo.",
    s2: "2. Dados que coletamos e motivos da coleta",
    s2Text: "Nosso produto coleta e utiliza alguns dados pessoais de nossos usuários, de acordo com o disposto nesta seção.",
    s21: "2.1. Dados pessoais fornecidos expressamente pelo usuário",
    s21Text: "Nós coletamos os seguintes dados pessoais que nossos usuários nos fornecem expressamente ao utilizar nosso produto:",
    data: [
      "Nome completo;", "Celular", "Foto", "Nome da instituição", "Email", "Data de nascimento", "CPF",
      "Escolaridade", "Religião", "Endereço", "Histórico de doenças e medicamentos", "Alergias", "Peso",
      "Altura", "Dieta.",
    ],
    when: "A coleta destes dados ocorre nos seguintes momentos:",
    moments: [
      "Quando o usuário se registra ou é cadastrado na plataforma;",
      "Quando o usuário entra em contato pelo site;",
      "Quando o usuário realiza autenticação no sistema.",
    ],
    why: "Os dados fornecidos por nossos usuários são coletados com as seguintes finalidades:",
    purposes: [
      "Para que o usuário possa se autenticar na plataforma;",
      "Criação de planos de cuidado de forma precisa;",
      "Para entender melhor o perfil dos nossos usuários a fim de oferecer uma melhor experiência.",
    ],
    s23: "2.3. Dados sensíveis",
    s23Text:
      "Não serão coletados dados sensíveis de nossos usuários, assim entendidos aqueles definidos nos arts. 11 e seguintes da Lei de Proteção de Dados Pessoais. Assim, não haverá coleta de dados sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural.",
    s24: "2.4. Coleta de dados não previstos expressamente",
    s24Text: [
      "Eventualmente, outros tipos de dados não previstos expressamente nesta Política de Privacidade poderão ser coletados, desde que sejam fornecidos com o consentimento do usuário, ou, ainda, que a coleta seja permitida com fundamento em outra base legal prevista em lei.",
      "Em qualquer caso, a coleta de dados e as atividades de tratamento dela decorrentes serão informadas aos usuários.",
    ],
  },
};

/** Shape every language's dictionary must match (Portuguese is the reference). */
export type Dictionary = typeof pt;

export default pt;
