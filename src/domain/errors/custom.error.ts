//Me permite el CustomError enviar err0res mas facil

//Creo una clase personalizada para el manejo de los errores
export class CustomError extends Error { // la clase customError tiene todas funcionalidades de la clase error, lo que extendemos es herencia y toca llamar en el contructor en las llaves a super

    constructor( //Cuando alguien utilice mi clase deveria enviar el msm de tipo string y status code tipo number que son los estado de error(400, 500)
        public readonly message: string,
        public readonly statusCode: number
    ){
        super(message);
    }

    static badRequest(message: string){ //los badReques son errores 400 entonces cuando envie errores 400 utilizo esta forma
        return new CustomError(message, 400)
    }

    static unAuthorized(message: string){ //los unAuthorized son errores 401 entonces cuando envie errores 400 utilizo esta forma
        return new CustomError(message, 401)
    }

    static forbiden(message: string){ //los forbiden son errores 403 entonces cuando envie errores 404 utilizo esta forma
        return new CustomError(message, 403)
    }

    static notFoud(message: string){ //los notFoud son errores 401 entonces cuando envie errores 404 utilizo esta forma
        return new CustomError(message, 404)
    }

    static internalServer(message: string){ //los internalServer son errores 500 entonces cuando envie errores 404 utilizo esta forma
        return new CustomError(message, 500)
    }
}

//Cuando ya tenemos estos errores exportamos la clase a index.ts y los utilizamos en los servicios