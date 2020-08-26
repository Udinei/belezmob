import * as RNLocalize from "react-native-localize";

const dateTimeZoneMob = () => {
    // opções de geração da data atual para comparação com a data desejada de agendamento,
    // enviada na requisição, a data sera criada com toLocaleDateString
    const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
        timeZone: RNLocalize.getTimeZone(), // obtem o timezone do dispositivo mob.
    };

    let tzDate = new Date().toLocaleDateString("pt-BR", options);

    const tzHora = tzDate.split(" ")[1]; // obtem somente o horario da data gerada

    const tzData = tzDate.split(" ")[0];
    const arrayDate = tzData.split("/");
    const hoje = arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0] + "T" + tzHora + ".000Z";

    return hoje;
}

export default dateTimeZoneMob();