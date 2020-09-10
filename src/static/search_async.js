

function setList(data) {
    sessionStorage.setItem("list", JSON.stringify(data));
}
function getList()
{
    return sessionStorage.getItem("list");
}

class Controller {

    constructor() {

        this.data = null;
        this.sorteddata = new Array();
        this.sorteddata_org = new Array();
        this.params = [];
        this.row = $("#elem-container > .row:nth-child(2)").clone();
        this.rate = [];
        this.state = [];
        this.city = [];
        this.center = [];
        this.rating = [];

    }

    SumRating(r)
    {
        if (!(r == null))
        {
            var s = 0;
            var a = 0;

            s += r.rate_motivation;
            s += r.rate_strictness;
            s += r.rate_effectivness;
            s += r.rate_interpersonalskills;
            s += r.rate_methodology;
            s += r.rate_punctuality;



            a = s / 6;

            if (!(isNaN(a)))
                this.rating[r.user_id] = parseFloat(a).toFixed(1);
            else
                this.rating[r.user_id] = "Ikke rated";

            return 0;
        } else
            return "Ikke rated";
    }

    ApplyState(a) {

        if (a != null)
        {
            if (this.state[a] == null)
            {
                $("#state").append('<li id="' + a + '"><a href="#"> ' + a + '</a></li>');
                this.state[a] = a;
            }


            return a;

        } else
        {
            return null;
        }
    }

    ApplyCity(a) {
        if (a != null)
        {
            if (this.city[a] == null)
            {
                $("#city").append('<li id="' + a + '"><a href="#"> ' + a + '</a></li>');
                this.city[a] = a;
            }

            return a;

        } else
        {
            return null;
        }
    }

    ApplyCenter(a) {
        if (a != null)
        {
            if (this.center[a] == null)
            {
                $("#trainingclub").append('<li id="' + a + '"><a href="#"> ' + a + '</a></li>');
                this.center[a] = a;
            }

            return a;

        } else
        {
            return null;
        }
    }

    Data(a)
    {
        this.data = JSON.parse(a);

        for (var i = 0; i < this.data.PT.length; i++)
        {
            this.sorteddata[i] = new Array(this.data.PT.length);
            this.sorteddata[i]["id"] = this.data.PT[i].id;
            this.sorteddata[i]["name"] = this.data.PT[i].name;
            this.sorteddata[i]["photo"] = this.data.PT[i].photo;
            this.sorteddata[i]["years_experience"] = this.data.PT[i].years_experience;
            this.sorteddata[i]["trainingstype"] = this.data.PT[i].trainingstype;
            this.sorteddata[i]["state"] = this.ApplyState(this.data.PT[i].state);
            this.sorteddata[i]["city"] = this.ApplyCity(this.data.PT[i].city);
            this.sorteddata[i]["trainingclub"] = this.ApplyCenter(this.data.PT[i].trainingclub);
            this.sorteddata[i]["education"] = this.data.PT[i].education;
            this.sorteddata[i]["gender"] = this.data.PT[i].gender;
            this.sorteddata[i]["grouptr"] = this.data.PT[i].grouptr;
            this.sorteddata[i]["positiontype"] = this.data.PT[i].positiontype;
            this.sorteddata[i]["special"] = this.data.PT[i].special;
            this.sorteddata[i]["meetup"] = this.data.PT[i].meetup;
            this.sorteddata[i]["aboutmytraining"] = this.data.PT[i].aboutmytraining;
            this.sorteddata[i]["about"] = this.data.PT[i].about;

            for (var x = 0; x < this.data.PTReview.length; x++)
            {
                this.SumRating(this.data.PTReview[x]);
            }

            this.sorteddata[i]["rating"] = this.rating;


        }

        this.sorteddata_org = this.sorteddata.slice();

    }

    Searchlist(data)
    {
        sl = data;
        console.log("data " + data);
        console.log("s1 " + this.s1);
    }

    get List() {
        return this.s1
    }

    // Method
    ApplyDom() {

        $('#SearchStatus').html("<i class='fa fa-user'></i>  Antall: " + this.sorteddata.length);

        if ($("#elem-container").children().length > 1) {
            $("#elem-container > .row").slice(1).remove()
        }

        for (var i = 0; i < this.sorteddata.length; i++) {

            var e = this.row;
            e.find("#photo").attr("src", (this.sorteddata[i]['photo'] === "" || this.sorteddata[i]['photo'] === null) ? "uploads/users/user.jpeg" : "uploads/users/" + this.sorteddata[i]['photo']);
            e.find("#name").text(this.sorteddata[i]['name']);
            e.find("#aboutme").text(this.sorteddata[i]['about']);
            e.find("#aboutmytr").text(this.sorteddata[i]['aboutmytraining']);
            e.find("#linkprofile").attr("href", "/profile/" + this.sorteddata[i]['id']);
            e.find("#linkpt").attr("href", "/pt/" + this.sorteddata[i]['name'].split(' ').join('.'));
            console.log(this.rating[this.sorteddata[i]['id']]);
            var rid = this.rating[this.sorteddata[i]['id']];
            e.find("#rating").html((rid == null) ? "Ikke rated" : '<i class="fa fa-star" aria-hidden="true"></i> ' + rid);
            //'<i class="fa fa-star" aria-hidden="true"></i> ' + a + " / 5"
            //$( "#elem-container > .row:nth-child(2)" ).clone().appendTo( "#elem-container" );
            $("#elem-container").append('<div class="row">' + e.html() + '</div>').fadeIn(100);
        }

        // $( "#elem-container > .row:nth-child(2)" ).effect("fade", "linear", 500, function(){$(this).remove();});
        //console.log(this.sorteddata.length);

    }

    SortCompare(param, value, compare) {

        for (var i = 0; i < this.sorteddata.length; i++) {

            var x = this.sorteddata[i]['id'];
            console.log(x);
            switch (compare) {

                case "above":
                    if (this.sorteddata[i][param] <= value)
                    {
                        if (this.sorteddata[i][param] == value)
                            break;

                        this.sorteddata.splice(i, 1);
                        i--;
                    } else if (this.rating[x] <= value || this.rating[x] === undefined)
                    {

                        this.sorteddata.splice(i, 1);
                        i--;
                    }
                    break;
                case "below":
                    if (value <= this.sorteddata[i][param])
                    {
                        if (value == this.sorteddata[i][param])
                            break;

                        this.sorteddata.splice(i, 1);
                        i--;
                    }
                    break;
                case "equal":
                    if (!(value === this.sorteddata[i][param]))
                    {
                        this.sorteddata.splice(i, 1);
                        i--;
                    }
                    break;
            }
        }
    }

    SortBetween(param, value, value2) {

        for (var i = 0; i < this.sorteddata.length; i++) {

            if (this.sorteddata[i][param] >= value && this.sorteddata[i][param] <= value2)
            {
                continue;
            } else
            {
                this.sorteddata.splice(i, 1);
                i--;
            }

        }
    }

    UpdateSearchData(a, b)
    {

        switch (a) {
            case "popular":
                if (b == 0) {
                    this.SortCompare("rating", 3, "above");
                } else if (b == 1) {
                    this.SortCompare("rating", 4, "above");
                }
                break;

            case "years_experience":
                if (b == 0) {
                    this.SortCompare(a, 1, "below");
                } else if (b == 1) {
                    this.SortBetween(a, 1, 4);
                } else if (b == 2) {
                    this.SortBetween(a, 4, 8);
                } else if (b == 3) {
                    this.SortCompare(a, 8, "above");
                }
                break;

            case "state":
                this.SortCompare(a, b, "equal");
                break;

            case "city":
                this.SortCompare(a, b, "equal");
                break;

            case "trainingclub":
                this.SortCompare(a, b, "equal");
                break;

            case "trainingstype":
                if (b == 0) {
                    this.SortCompare(a, "Styrke", "equal");
                } else if (b == 1) {
                    this.SortCompare(a, "Kondisjon", "equal");
                } else if (b == 2) {
                    this.SortCompare(a, "Cross-fit", "equal");
                }
                this.ApplyDom();
                break;

            case "education":
                this.SortCompare(a, b, "equal");
                break;

            case "gender":
                this.SortCompare(a, b, "equal");
                break;

            case "grouptr":
                this.SortCompare(a, b, "equal");
                break;

            case "special":
                this.SortCompare(a, b, "equal");
                break;

            case "positiontype":
                this.SortCompare(a, b, "equal");
                break;

            case "meetup":
                if (b == 0) {
                    this.SortCompare(a, b, "equal");
                } else if (b == 1) {
                    this.SortCompare(a, b, "equal");
                }
                break;

            default:
            //console.log(a);
        }
        this.ApplyDom();
        this.sorteddata = this.sorteddata_org.slice();
    }

    // Method
    ClickController(a, b) {
        console.log("clicked: " + a + " value " + b);

        this.params[a] = b;




        for (var index in this.params) {
            if (b === "reset")
            {
                delete this.params[a];
            }

            this.UpdateSearchData(a, b);

            console.log("clicked: " + index + " value " + this.params[index]);

        }

    }

}


c = new Controller();



TheObject = {
    getArray: function (callback) {
        $.ajax({
            dataType: "json",
            url: "api/v1/pt",
            contentType: "application/json; charset=utf-8",
            cache: false,
            tryCount: 0,
            retryLimit: 3,
            success: function (data) {
                callback.call(this, data);
                window.sessionStorage.setItem("list", JSON.stringify(data));
            },
            error: function (xhr, error) {
                $('#SearchStatus').text("Tilkobling feilet, siden må lastes om ... " + xhr + " " + error);

            }
        });
    }
}


$(window).ready(function () {
    TheObject.getArray(function (data) {
        javascript: c.Data(JSON.stringify(data));
        c.ApplyDom();

        $('#search-container').find('li').on('click', function (e) {
            e.preventDefault();
            $(this).parents().children("button").css("color", "#dc6700");
            $(this).addClass("btn-warning").siblings().removeClass("btn-warning");
            $('#resetall').css("display", "block");
            c.ClickController($(this).parent().attr("id"), $(this).attr('id'));
            return false;
        });

        $('#resetall').on('click', function (e) {
            e.preventDefault();
            $('#search-container').find('ul>li.btn-warning').removeClass("btn-warning");
            $('#search-container').find('button').css("color", "#333");
            c.ClickController(0, 0);
            return false;
        });




    });
});




