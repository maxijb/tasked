

        window.helpers = W.helpers = {


                cookies: {
                        //decodes cookie as it comes from sails, with the "j:" prefix and returns JSON if posible
                        decodeCookie: function (text) {
                                try {
                                        return JSON.parse(text.substr(2));
                                } catch (ex) {
                                        return text;
                                }
                        },

                        //add "j:" prefix for sails, and return json.stringify if posible, otherwise obj.toString
                        encodeCookie: function (obj) {
                                try {
                                        return "j:" + JSON.stringify(obj);
                                } catch (ex) {
                                        return obj.toString();
                                }
                        }
                },

                slugify: function(str) {
                    str = str.replace(/^\s+|\s+$/g, ''); // trim 
                  
                    str = str.toLowerCase();
                    // remove accents, swap ñ for n, etc
                    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
                    var to   = "aaaaeeeeiiiioooouuuunc------";
                    for (var i=0, l=from.length ; i<l ; i++) {
                      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                    }
                    
                        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                          .replace(/\s+/g, '-') // collapse whitespace and replace by -
                          .replace(/-+/g, '-'); // collapse dashes
                    
                    return str;
                },

                events: {
                    addUserEvent: function(key, value) {
                        var obj = W.helpers.cookies.decodeCookie($.cookie('w_ctx'));
                        obj.events[key] = (value || 1);
                        $.cookie('w_ctx', W.helpers.cookies.encodeCookie(obj));
                    }
                }

        }



