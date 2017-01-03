/* !
 * Softtion WebSQL v1.1.6
 * License: MIT
 * (c) 2015-2017 Softtion Developers
 * Update: 03/Enero/2017
 */

/* global Model */

(function (factory) {
    if (typeof jQuery === "function" && typeof window.softtion === "object") {
        factory(jQuery, window.softtion);
    } else { 
        throw new Error("Softtion WebSQL requiere jQuery y Softtion cargado en la Aplicación");
    } // No se ha cargado jQuery y Softtion
})(function (jQuery, softtion) {
    
    var WebSQL = {
        is: function (type, object) {
            switch (type) {
                case ("filter"):
                    return (softtion.isDefined(object) && object instanceof IFilter);
                    
                case ("relation"):
                    return (softtion.isDefined(object) && object instanceof Relation);
                
                default: return false;
            }
        },
        
        functionError: function (sqlError) {
            console.log('Código (' + sqlError.code + '): ' + sqlError.message);
        },
        
        callback: function (callbackResult, value) {
            if (softtion.isFunction(callbackResult)) { 
                callbackResult(value); 
            } // Se ha definido funcion para enviar resultado
        },
        
        commandCreateTable: function (options) {
            var $command = "CREATE TABLE "; // Inicio del comando
            $command += (!options.exists) ? "IF NOT EXISTS " : "";

            $command += options.name + " ("; // Nombre de tabla
            var indexLast = options.columns.length - 1; // Última columna 

            options.columns.forEach(function (column) {
                $command += options.columns[indexLast] === column ? column : column + ",";
            });

            return $command + ");"; // Retornando comando final
        },
        
        createFilter: function (filter, column, operator, values, negation) {
            switch (filter) {
                case ("isNull"): 
                    return new IsNull(column, negation);
                    
                case ("condition"): 
                    return new Condition(column, operator, values[0]);
                    
                case ("in"): 
                    return new In(column, values, negation);
                    
                case ("between"): 
                    return new Between(column, values[0], values[1], negation);
                    
                case ("like"): 
                    return new Like(column, values[0], negation);
            };
        },
        
        addFilter: function (filter, model, column, operator, values) {
            model.whereModel = model.whereModel || new Where();

            var $filter = this.createFilter(filter, column, operator, values, model.activeNot), 
                $logic = model.whereModel.isEmpty() ? undefined : model.activeOr ? "OR" : "AND";

            model.whereModel.addFilter($filter, $logic);
            model.activeOr = false; model.activeNot = false; 
        },
        
        createRelation: function (select, list, indexList, indexRelation, callbackResult) {
            var $object = list[indexList], $relation = select.relations[indexRelation];

            softtion.websql.select({
                tables : [$relation.get("table")], 
                connection : select.options.connection
            }).setWhere(
                new Where().addFilter(
                    new Condition($relation.get("foreign"),"=",$object[$relation.get("local")])
                )
            ).execute(function (result) {
                if (result.success) { 
                    switch ($relation.get("type")) {
                        case ("hasOne"):
                            $object[$relation.get("variable") || $relation.get("table")] = 
                                (result.data.isEmpty()) ? null : result.data[0]; 
                        break;

                        default :
                            $object[$relation.get("variable") || $relation.get("table")] = result.data; 
                        break;
                    }
                }

                indexRelation++; // Se aumenta indice para seguir relacionando

                if (indexRelation < select.relations.length) {
                    // Cargando relaciones en el Objeto
                    this.createRelation(select, list, indexList, indexRelation, callbackResult);
                } else {
                    indexRelation = 0; indexList++; // Siguiente objeto de la lista

                    if (indexList < list.length) {
                        // Cargando relaciones en el objeto
                        this.createRelation(select, list, indexList, indexRelation, callbackResult);
                    } else {
                        WebSQL.callback(callbackResult,{ success: true, data: list });
                    } // Finalizando proceso Relacional
                } // Ya se argaron todas las relaciones establecidas
            });
        }
    };
    
    // Interfaz IFilter
    
    var IFilter = function () { };
    
    IFilter.prototype.getDescription = function () {};
    IFilter.prototype.getValues = function () {};

    // Clase Condition
    
    var Condition = function (column, operator, value) {
        this.column = column;       // Columna
        this.operator = operator;   // Operador
        this.value = value;         // Valor
    };

    Condition.prototype = new IFilter();
    Condition.prototype.constructor = Condition;

    Condition.prototype.getDescription = function () {
        return "(" + this.column + " " + this.operator + " ?)"; 
    };

    Condition.prototype.getValues = function () { 
        return softtion.parseArray(this.value);
    };

    // Clase Like
    
    var Like = function (column, value, negation) {
        this.column = column;       // Columna
        this.value = value;         // Valor
        this.negation = negation;   // Negación de condición
    };

    Like.prototype = new IFilter();
    Like.prototype.constructor = Like;

    Like.prototype.getDescription = function () { 
        return "(" + this.column + (this.negation ? " NOT" : "") + " LIKE ?)"; 
    };

    Like.prototype.getValues = function () {
        return softtion.parseArray(this.value);
    };
    
    // Clase In
    
    var In = function (column, values, negation) {
        this.column = column;       // Columna
        this.value = values;        // Valores para In
        this.negation = negation;   // Negación de condición
    };

    In.prototype = new IFilter();
    In.prototype.constructor = In;

    In.prototype.getDescription = function () {
        var $filter = "(" + this.column + (this.negation ? " NOT" : "") + " IN (";
        
        for (var $i = 0; $i < (this.value.length - 1); $i++) { $filter += "?,"; }

        return $filter + "?))"; // Retornando filter completado
    };

    In.prototype.getValues = function () { 
        return softtion.parseArray(this.value); 
    };
    
    // Clase Between

    var Between = function (column, since, until, negation) {
        this.column = column;       // Columna
        this.since = since;         // Valor inicial
        this.until = until;         // Valor final
        this.negation = negation;   // Negación de condición
    };

    Between.prototype = new IFilter();
    Between.prototype.constructor = Between;

    Between.prototype.getDescription = function () {
        return "(" + this.column + (this.negation ? " NOT" : "") + " BETWEEN ? AND ?)";
    };

    Between.prototype.getValues = function () { 
        return softtion.parseArray([this.since, this.until]); 
    };
    
    // Clase IsNull
    
    var IsNull = function (column, negation) {
        this.column = column;       // Columna
        this.negation = negation;   // Negación de condición
    };

    IsNull.prototype = new IFilter();
    IsNull.prototype.constructor = IsNull;
    
    IsNull.prototype.getDescription = function () {
        return "(" + this.column + " IS" + (this.negation ? " NOT" : "") + " NULL";
    };

    IsNull.prototype.getValues = function () { 
        return new Array(); 
    };

    // Clase Filters

    var Filters = function () {
        this.filters = new Array(); // Lista de condiciones
    };

    Filters.prototype = new IFilter();
    Filters.prototype.constructor = Filters;

    Filters.prototype.addCondition = function (filter, operatorLogic) {
        if (WebSQL.is("filter", filter)) {
            this.filters.push({ filter : filter, operatorLogic : operatorLogic });
        } // Agregando filtro para clausula
        
        return this; // Retornando para recursividad
    };

    Filters.prototype.getDescription = function () {
        if (this.filters.isEmpty()) {
            return null;
        } // No se han definido condiciones para clausula Where

        var $filter = "(", $index = 1; // Inicializando filtro
        
        if (this.filters.has(1)) {
            $filter += this.filters.first().filter.getDescription();
        } else {
            this.filters.forEach(function (filterJson) { 
                var $operator = ($index === 1) ? "" :
                    (!softtion.isDefined(filterJson.operatorLogic))
                    ? (" " + filterJson.operatorLogic + " ") : "";
                
                if (softtion.isDefined(filterJson.condition)) {
                    $filter += $operator + filterJson.filter.getDescription(); $index++;
                }
            }); // Recorriendo la lista de condiciones para clausula Where
        }

        return $filter + ")"; // Retornando filter completado
    };
    
    Filters.prototype.getValues = function () {
        var $values = new Array(); // Valores
        
        this.filters.forEach(function (conditionJson) {
            $values = $values.concat(conditionJson.condition.getValues());
        });
        
        return $values; // Retornando lista de Valores
    };

    // Interfaz IClause

    var IClause = function () { };
    
    IClause.prototype.getDescription = function () { return ""; };
    IClause.prototype.getValues = function () { return []; };

    // Clase Where
    
    var Where = function () { 
        this.filters = new Array(); // Lista de filtros para clausula
    };

    Where.prototype = new IClause();
    Where.prototype.constructor = Where;

    Where.prototype.addFilter = function (filter, operatorLogic) {
        if (WebSQL.is("filter", filter)) {
            this.filters.push({ filter : filter, operatorLogic : operatorLogic });
        } // Agregando filtro para la clausula Where

        return this; // Retornando para recursividad
    };
    
    Where.prototype.isEmpty = function () { 
        return this.filters.isEmpty(); 
    };
    
    Where.prototype.setOperatorLogic = function (operatorLogic) {
        this.filters.last().operatorLogic = operatorLogic;
    };

    Where.prototype.getDescription = function () {
        if (this.filters.isEmpty()) { 
            return "";
        } // No se han definido filtros para clausula Where

        var $clause = "WHERE (", $index = 1; // Inicializando filtro
        
        if (this.filters.has(1)) {
            $clause += this.filters.first().filter.getDescription();
        } else {
            this.filters.forEach(function (filterWhere) { 
                var $operator = ($index === 1) ? "" :
                    (softtion.isDefined(filterWhere.operatorLogic))
                    ? (" " + filterWhere.operatorLogic + " ") : "";

                if (softtion.isDefined(filterWhere.filter)) {
                    $clause += $operator + filterWhere.filter.getDescription(); $index++; 
                }
            }); // Recorriendo lista de filtros de la clausula Where
        }

        return $clause + ")"; // Retornando clausula completada
    };

    Where.prototype.getValues = function () {
        var values = new Array(); // Valores

        this.filters.forEach(function (filterWhere) {
            values = values.concat(filterWhere.filter.getValues());
        });

        return values; // Retornando valores de la claúsula
    };
    
    // Clase GroupBy
    
    var GroupBy = function () {
        this.column = undefined; // Columnas para agrupar
    };

    GroupBy.prototype = new IClause();
    GroupBy.prototype.constructor = GroupBy;
    
    GroupBy.prototype.setColumn = function (column) {
        this.column = column; return this; // Retornando para recursividad
    };
    
    GroupBy.prototype.getDescription = function () {
        if (softtion.isUndefined(this.column)) { 
            return null;
        } // No se han definido columna para clausula GroupBy
        
        return "GROUP BY " + this.column; // Retornando clausula completada
    };
    
    // Clase OrderBy
    
    var OrderBy = function () {
        this.columns = new Array(); // Lista de columnas para Ordenar
    };

    OrderBy.prototype = new IClause();
    OrderBy.prototype.constructor = OrderBy;
    
    OrderBy.prototype.addColumn = function (columnName, operatorOrder) {
        if (softtion.isDefined(columnName)) {
            this.columns.push({ name : columnName, operatorOrder : operatorOrder });
        } // Agregando columnas para la clausula OrderBy

        return this; // Retornando para recursividad
    };
    
    OrderBy.prototype.getDescription = function () {
        if (this.columns.isEmpty()) { 
            return "";
        } // No se han definido columnas para clausula OrderBy
        
        var $clause = "ORDER BY "; // Iniciando clausula
        
        for (var $i = 0; $i < (this.columns.length - 1); $i++) {
            var $column = this.columns[$i], // Columna
                $operator = $column.operatorOrder || 'ASC';
            
            $clause += $column.name + " " + $operator + ", "; 
        } // Recorriendo lista de Columnas de Clausula
        
        var $lastColumn = this.columns.last(); // Ultima o Primera columna
        $clause += $lastColumn.name + " " + ($lastColumn.operatorOrder || 'ASC'); 

        return $clause; // Retornando clausula completada
    };
    
    // Clase Relation
    
    var Relation = function () {
        this.table = undefined; 
        this.local = undefined; 
        this.foreign = undefined;
        this.type = undefined; 
        this.variable = undefined;
    };

    Relation.prototype.set = function (attributte, value) {
        switch (attributte) {
            case ('table') : this.table = value; break;
            case ('local') : this.local = value; break;
            case ('foreign') : this.foreign = value; break;
            case ('type') : this.type = value; break;
            case ('variable') : this.variable = value; break;
        }

        return this; // Retornando interfaz fluida
    };

    Relation.prototype.get = function (attributte) {
        switch (attributte) {
            case ('table') : return this.table;
            case ('local') : return this.local;
            case ('foreign') : return this.foreign;
            case ('type') : return this.type;
            case ('variable') : return this.variable;
        }
    };
    
    var Database = function (options) {
        var $defaults = {
            version: '1.0.0',
            descripcion: 'Database Softtion',
            size: 2 * 1024 * 1024
        };

        var $options = jQuery.extend({}, $defaults, options);

        this.database = window.openDatabase(
            $options.name,          // Nombre de Base de Datos
            $options.version,       // Versión de Base de Datos
            $options.description,   // Descripción de Base de Datos
            $options.size           // Tamaño de Base de Datos
        );
    };

    Database.prototype.getConnection = function () {
        return this.database;
    };

    Database.prototype.createTable = function (options, callbackResult) {
        var $command = WebSQL.commandCreateTable(options);

        if (this.database) {
            this.database.transaction(function (sqlTransaction) {
                sqlTransaction.executeSql($command, [], 
                    function (sqlTransaccion) { 
                        WebSQL.callback(callbackResult, true);
                    },
                    function (sqlTransaccion, sqlError) {
                        WebSQL.functionError(sqlError); WebSQL.callback(callbackResult, false);
                    }
                );
            });
        }
    };

    Database.prototype.dropTable = function (table, callbackResult) {
        var $command = "DROP TABLE " + table; // Comando

        if (this.database) {
            this.database.transaction(function (sqlTransaction) {
                sqlTransaction.executeSql($command, [], 
                    function (sqlTransaccion) { 
                        WebSQL.callback(callbackResult, true);
                    },
                    function (sqlTransaccion, sqlError) {
                        WebSQL.functionError(sqlError); WebSQL.callback(callbackResult, false);
                    }
                );
            });
        }
    };

    softtion.openDatabase = function (options) {
        return new Database(options); // Creando handler de Base de datos
    };

    // Interfaz ICommand

    var ICommand = function () { 
        this.clauses = [];          // Clausulas
        this.where = undefined;     // Clausula Where
    };
    
    ICommand.prototype.getCommand = function () {};
    ICommand.prototype.execute = function (callback) {};

    //<editor-fold defaultstate="collapsed" desc="Modelo para gestionar Comando INSERT">

    var Insert = function (options) { 
        var $defaults = { 
            table : undefined,
            columns : new Array(), 
            values : new Array(), 
            connection : undefined 
        };
        
        this.options = jQuery.extend({}, $defaults, options);
    };

    Insert.prototype = new ICommand();
    Insert.prototype.constructor = Insert;

    Insert.prototype.getCommand = function () {
        var $table = this.options.table,
            $columns = this.options.columns,
            $values = this.options.values;
        
        if (softtion.isUndefined($table) || softtion.isUndefined($values)) {
            return null;
        } // Comando no tiene tabla, ni valores definidos

        var $command = "INSERT INTO " + $table; 

        if (!$columns.isEmpty()) {
            $command += " ("; // Definición de Columnas
            
            for (var $i = 0; $i < ($columns.length - 1); $i++) {
                $command += $columns[$i] + ","; 
            } // Cargando lista de columnas para el Comando
            
            $command += $columns.last() + ")";
        } // Se establecieron los nombres de las columnas

        $command += " VALUES ("; // Cargando los valores a insertar

        for (var $i = 0; $i < ($values.length - 1); $i++) {
            $command += "?,"; 
        } // Recorriendo la lista de Valores
        
        $command += "?)"; return $command; // Retornando comando INSERT
    };

    Insert.prototype.execute = function (callbackResult) {
        var $command = this.getCommand(); // Comando generado

        if ($command !== null) {
            var $values = this.options.values; // Valores de la Sentencia

            this.options.connection.transaction(function (sqlTransaction) {
                sqlTransaction.executeSql($command, $values, 
                    function (sqlTransaccion) { 
                        WebSQL.callback(callbackResult, { success: true });
                    },
                    function (sqlTransaccion, sqlError) {
                        WebSQL.callback(callbackResult, { success: false, error: sqlError });
                    }
                );
            });

            return true; // Commando ejecutado correctamente
        }

        return false; // Commando no se ha generado correctamente
    };

    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Modelo para gestionar Comando UPDATE">

    var Update = function (options) { 
        var $defaults = { 
            connection : undefined,  
            table : undefined, 
            columns : new Array(), 
            values : new Array(),
            where : undefined
        };
        
        this.options = jQuery.extend({}, $defaults, options);
    };

    Update.prototype = new ICommand();
    Update.prototype.constructor = Update;

    Update.prototype.getCommand = function () {
        var $table = this.options.table,
            $columns = this.options.columns,
            $where = this.options.where;
        
        if (softtion.isUndefined($table) || $columns.isEmpty()) {
            return null;
        } // Comando no tiene tabla, ni columnas definidas

        var $command = "UPDATE " + $table + " SET ";
        
        for (var $i = 0; $i < ($columns.length - 1); $i++) {
            $command += $columns[$i] + "=?,"; 
        } // Cargando columnas para ejecutar Comando
        
        $command += $columns.last() + "=?";

        if (softtion.isDefined($where)) { 
            $command += " " + $where.getDescription();
        }

        return $command; // Retornando comando UPDATE
    };

    Update.prototype.execute = function (callbackResult) {
        var $command = this.getCommand(); // Comando generado

        if ($command !== null) {
            var $values = this.options.values; // Valores de la Sentencia

            if (this.options.where) {
                $values = $values.concat(this.options.where.getValues());
            } // Agrengado valores de Clausula WHERE

            this.options.connection.transaction(function (sqlTransaction) {
                sqlTransaction.executeSql($command, $values,
                    function (sqlTransaccion, sqlResultSet) { 
                        WebSQL.callback(callbackResult, { success: true, rowsAffected: sqlResultSet.rowsAffected });
                    },
                    function (sqlTransaccion, sqlError) {
                        WebSQL.callback(callbackResult, { success: false, rowsAffected: -1, error: sqlError });
                    }
                );
            });

            return true; // Commando ejecutado correctamente
        }

        return false; // Commando no se ha generado correctamente
    };

    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Modelo para gestionar Comando DELETE">

    var Delete = function (options) { 
        var $defaults = { 
            table : undefined, 
            connection : undefined, 
            where : undefined
        };
        
        this.options = jQuery.extend({}, $defaults, options);
    };

    Delete.prototype = new ICommand();
    Delete.prototype.constructor = Delete;

    Delete.prototype.getCommand = function () {
        var $table = this.options.table, $where = this.options.where;
        
        if (softtion.isUndefined($table)) {
            return null;
        } // Comando no tiene tabla definida

        var $command = "DELETE FROM " + $table; // Iniciando 
        
        if (softtion.isDefined($where)) { 
            $command += " " + $where.getDescription(); 
        }
        
        return $command; // Retornando comando DELETE
    };

    Delete.prototype.execute = function (callbackResult) {
        var $command = this.getCommand(); // Comando generado

        if ($command !== null) {
            var $values = []; // Valores de la Sentencia

            if (this.options.where) {
                $values = $values.concat(this.options.where.getValues()); 
            } // Agrengado valores de Clausula WHERE

            this.options.connection.transaction(function (sqlTransaction) {
                sqlTransaction.executeSql($command, $values,
                    function (sqlTransaccion, sqlResultSet) { 
                        WebSQL.callback(callbackResult,{ success: true, rowsAffected: sqlResultSet.rowsAffected });
                    },
                    function (sqlTransaccion, sqlError) {
                        WebSQL.callback(callbackResult,{ success: false, rowsAffected: -1, error: sqlError });
                    }
                );
            });

            return true; // Commando ejecutado correctamente
        }

        return false; // Commando no se ha generado correctamente
    };

    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Modelo para gestionar Comando SELECT">

    var Select = function (options) { 
        var $defaults = { 
            tables: new Array(),   // Lista de tablas
            columns: new Array(),  // Columnas para filtrar
            values: new Array(),   // Valores
            connection: undefined,      // Conexión base de Datos
            distinct: false,            // Distinct
            where: undefined,           // Clausula Where
            groupBy: undefined,         // Clausula GroupBy
            orderBy: undefined,         // Clausula OrderBy
            relations: new Array() // Relaciones entre Tablas
        };
        
        this.options = jQuery.extend({}, $defaults, options);
    };

    Select.prototype = new ICommand();
    Select.prototype.constructor = Select;
    
    Select.prototype.set = function (key, value) {
        switch (key) {
            case ("where"): 
                this.options.where = value; break;
                
            case ("clauses"): 
                this.options.clauses = value; break;
        }
        
        return this; // Retornando interfaz fluida
    };

    Select.prototype.addRelation = function (relation) {
        if (WebSQL.is("relation", relation)) {
            this.relations.push(relation); 
        } // Agregando relacion en la Variable

        return this; // Retornando interfaz fluida
    };

    Select.prototype.hasOne = function (table, local, foreign, variable) {
        this.addRelation(new Relation().
            set("table", table).
            set("local", local).
            set("foreign", foreign).
            set("variable", variable).
            set("type", "hasOne")
        );

        return this; // Retornando interfaz fluida
    };

    Select.prototype.hasMany = function (table, local, foreign, variable) {
        this.addRelation(new Relation().
            set("table", table).
            set("local", local).
            set("foreign", foreign).
            set("variable", variable).
            set("type", "hasMany")
        );

        return this; // Retornando interfaz fluida
    };

    Select.prototype.getCommand = function () {
        var $tables = this.options.tables,
            $distinct = this.options.distinct,
            $columns = this.options.columns,
            $where = this.options.where,
            $groupBy = this.options.groupBy,
            $orderBy = this.options.orderBy;
        
        if (softtion.isArrayEmpty($tables)) {
            return null;
        } // El comando no tiene tablas definidas

        var $command = "SELECT" + (($distinct) ? " DISTINCT " : " ");
        
        if (softtion.isArrayEmpty($columns)) {
            $command += "*"; // No definío columnas, se establece el comodín
        } else {
            for (var $i = 0; $i < ($columns.length - 1); $i++) {
                $command += $columns[$i] + ","; 
            } // Cargando columnas para el comando
            
            $command += $columns.last();
        } // Se establecen las columnas definidas en el Comando

        $command += " FROM "; // Cargando tabla de consulta
        
        for (var $i = 0; $i < ($tables.length - 1); $i++) {
            $command += $tables[$i] + ","; 
        } // Cargando tablas para el Comando
            
        $command += $tables.last();

        if (softtion.isDefined($where)) {
            $command += " " + $where.getDescription();
        } // Where definido
        
        if (softtion.isDefined($groupBy)) { 
            $command += " " + $groupBy.getDescription();
        } // GroupBy definido
        
        if (softtion.isDefined($orderBy)) { 
            $command += " " + $orderBy.getDescription(); 
        } // OrderBy definido

        return $command; // Retornando sentencia SELECT
    };

    Select.prototype.execute = function (callbackResult) {
        var $command = this.getCommand(); // Comando generado

        if ($command !== null) {
            var $select = this, $values = [], $relations = this.options.relations;

            if (this.options.where) {
                $values = $values.concat(this.options.where.getValues()); 
            } // Agrengado valores de Clausula WHERE
            
            this.options.connection.transaction(function (sqlTransaction) {
                sqlTransaction.executeSql($command, $values,
                    function (sqlTransaccion, sqlResultSet) { 
                        var $objects = new Array(); // Objetos resultante

                        if (sqlResultSet.rows.length !== 0) {
                            jQuery.each(sqlResultSet.rows, function (key, object) {
                                $objects.push(object); 
                            });
                        } // Se encontraron resultados en la Consulta

                        if (!$objects.isEmpty() && !softtion.isArrayEmpty($relations)) {
                            WebSQL.createRelation($select, $objects, 0, 0, callbackResult);
                        } else { 
                            WebSQL.callback(callbackResult, { success: true, data: $objects });
                        } // No se establecieron parametros para realizar Relaciones
                    },
                    function (sqlTransaccion, sqlError) {
                        WebSQL.callback(callbackResult, { success: false, data: undefined, error: sqlError });
                    }
                );
            });

            return true; // Commando ejecutado correctamente
        }

        return false; // Commando no se ha generado correctamente
    };

    //</editor-fold>

    softtion.websql = {
        insert: function (options) { 
            return new Insert(options); 
        },
        update: function (options) { 
            return new Update(options); 
        },
        delete: function (options) { 
            return new Delete(options); 
        },
        select: function (options) { 
            return new Select(options); 
        }
    };
    
    // Clase Model
    
    Model = function (nameTable) { 
        this.table = nameTable; 
        this.primaryKey = "id";
        
        this.whereModel = undefined; 
        this.groupByModel = undefined;
        this.orderByModel = undefined;
        
        this.activeOr = false; 
        this.activeNot = false; 
        
        this.command = "select";
    };
    
    // Métodos de la clase Model
    
    Model.prototype.set = function (key, value) {
        switch (key) {
            case ("connection"): 
                this.connection = value; break;
                
            case ("table"): 
                this.table = value; break;
                
            case ("command"): 
                this.command = value; break;
            
            case ("columns"): 
                this.columns = value; break;
                
            case ("values"): 
                this.values = value; break;
        }
    };
    
    Model.prototype.get = function (key) {
        switch (key) {
            case ("connection"): 
                return this.connection;
                
            case ("table"): 
                return this.table;
                
            case ("command"): 
                return this.command;
            
            case ("columns"): 
                return this.columns;
                
            case ("values"): 
                return this.values;
                
            case ("primaryKey"): 
                return this.primaryKey;
        }
    };
    
    Model.prototype.or = function () {
        this.activeOr = true; return this;
    };
    
    Model.prototype.not = function () { 
        this.activeNot = true; return this;
    };
    
    // Comando 'Insert'
    
    Model.prototype.insert = function (values, columns, callback) {
        var $self = this; // Objeto Model
        
        new Insert({
            table: $self.get('table'), 
            connection: $self.get('connection'),
            columns: columns || new Array(), 
            values: values
        }).execute(callback);
    };
    
    Model.prototype.insertJson = function (objectJson, callback) {
        var $columns = new Array(), 
            $values = new Array(), $self = this; 
        
        jQuery.each(objectJson, function (key, value) { 
            $columns.push(key); $values.push(value); 
        }); // Recorriendo el objeto para establecer columnas
        
        $self.insert($values, $columns, callback);
    };
    
    // Comando 'Select'
    
    Model.prototype.select = function (columns) { 
        this.set("command","select"); this.set("columns",columns); 
        return this; // Retornando para recursividad
    };
    
    // Comando 'Update'
    
    Model.prototype.update = function (columns, values) {
        this.set("command","update"); // Estableciendo Comando
        this.set("columns",columns); this.set("values",values); 
        return this; // Retornando para recursividad
    };
    
    Model.prototype.updateJson = function (objectJson) {
        var $columns = new Array(), 
            $values = new Array(), $self = this; 
        
        jQuery.each(objectJson, function (key, value) { 
            $columns.push(key); $values.push(value); 
        }); // Recorriendo el objeto para establecer columnas
        
        return $self.update($columns, $values);
    };
    
    // Comando 'Delete'
    
    Model.prototype.delete = function () { 
        this.set("command","delete"); return this; // Retornando para recursividad
    };
    
    // Clausula 'Where'
    
    Model.prototype.where = function (column, operator, value) {
        WebSQL.addFilter("condition", this, column, operator, [value]); return this;
    };
    
    Model.prototype.in = function (column, values) {
        WebSQL.addFilter("in", this, column, null, values); return this; 
    };
    
    Model.prototype.between = function (column, since, until) {
        WebSQL.addFilter("between", this, column, null, [since, until]); return this; 
    };
    
    Model.prototype.like = function (column, value) {
        WebSQL.addFilter("like", this, column, null, [value]); return this; 
    };
    
    Model.prototype.isNull = function (column) {
        WebSQL.addFilter("isNull", this, column, null, null); return this; 
    };
    
    // Clausula 'GroupBy'
    
    Model.prototype.groupBy = function (column) {
        this.groupByModel = this.groupByModel || new GroupBy();
        this.groupByModel.setColumn(column); return this;
    };
    
    // Clausula 'OrderBy'
    
    Model.prototype.orderBy = function (column, operatorOrder) {
        this.orderByModel = this.orderByModel || new OrderBy();
        this.orderByModel.addColumn(column,operatorOrder); return this;
    };
    
    // Método para ejecutar comando configurado
    
    Model.prototype.resultSet = function (callback) {
        switch (this.get("command")) {
            case ("select") :
                new Select({
                    connection: this.get("connection"),
                    tables: softtion.parseArray(this.get("table")),
                    columns: this.get("columns") || new Array(),
                    where: this.whereModel,
                    groupBy: this.groupByModel,
                    orderBy: this.orderByModel
                }).execute(callback);
                
                this.orderByModel = undefined; this.groupByModel = undefined;
            break;
            
            case ("update") :
                new Update({
                    connection: this.get("connection"),
                    table: this.get("table"),
                    values: this.get("values"),
                    columns: this.get("columns") || new Array(),
                    where: this.whereModel
                }).execute(callback);
            break;
            
            case ("delete") :
                new Delete({
                    table: this.get('table'), 
                    connection: this.get('connection'),
                    where: this.whereModel
                }).execute(callback);
            break;
        }
        
        this.whereModel = undefined; this.set("command","select");
    };
    
    Model.prototype.all = function (callback) {
        this.set("command","select"); this.resultSet(callback);
    };
    
    Model.prototype.find = function (value, callback) {
        var primaryKey = this.get("primaryKey");
        
        if (softtion.isString(primaryKey)) {
            this.where(primaryKey, "=", value).resultSet(callback);
        } else {
            callback({ success: false, data: "No ha definido PRIMARY KEY" });
        } // No se ha definido llave primaria
    };
});