const { utcToZonedTime, zonedTimeToUtc, format } = require('date-fns-tz')
 /**
     * Entrada e saida em funcao do timezone
     * ---------
     *  timeZone = 'America/Cuiaba'
     *     entrada: 2020-08-17T21:00:00.000Z
     *     saida: 2020-08-17 17:00:00 -04:00
     * -------------
     *  timeZone = "UTC"
     *     entrada: 2020-08-17T21:00:00.000Z
     *     saida: 2020-08-17 21:00:00 +00:00
     * @param {*} date - data - ex: parseISO(agenda.date)
     * @param {*} fmt - formato - "yyyy-MM-dd kk:mm:ss xxx"
     * @param {*} tz - timeZone- obtido com RNLocalize  ex: const timeZone = RNLocalize.getTimeZone() ou "UTC"
     * ex de uso: formatInTimeZone(parseISO(agenda.date), "yyyy-MM-dd kk:mm:ss xxx", timeZone)
     */
    function formatInTimeZone(date, fmt, tz) {
       return  format(utcToZonedTime(date, tz),
            fmt,
            { timeZone: tz });
    }

export default formatInTimeZone;