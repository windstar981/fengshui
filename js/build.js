$(document).ready(function () {
    function createYear(year){
        let prefixes = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        let suffixes = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        return  prefixes[(year+6)%10].toString() +" "+ suffixes[(year-4)%12].toString();
    }

   // console.log("create year "+createYear(2045));

    let dataTamTai = {
        "Dần": "Thân; Dậu; Tuất",
        "Ngọ": "Thân; Dậu; Tuất",
        "Tuất": "Thân; Dậu; Tuất",
        "Thân": "Dần; Mão; Thìn",
        "Tý": "Dần; Mão; Thìn",
        "Thìn": "Dần; Mão; Thìn",
        "Tỵ": "Hợi; Tý; Sửu",
        "Dậu": "Hợi; Tý; Sửu",
        "Sửu": "Hợi; Tý; Sửu",
        "Hợi": "Tỵ; Ngọ; Mùi",
        "Mão": "Tỵ; Ngọ; Mùi",
        "Mùi": "Tỵ; Ngọ; Mùi",
    }
   
    const dataHoangOc = ['12', '14', '15', '18', '21', '23', '24', '27', '29', '30', '32', '33', '36', '38', '39', '41', '42', '45', '47', '48', '50', '51', '54', '56', '57', '60', '63', '65', '66', '69', '72', '74', '75'];

    let year = 0;

    let yearBuild = 2022;

    $(".year-build").change(function () {
        yearBuild = $(".year-build").val();
        console.log(yearBuild);
    });

    let checkYear = 1;

    function getNameTamTai(year)
    {
        return dataTamTai[(getNameYear(year).split(" ")[1]).toString()];
    }
  //  console.log("get name tam tai " + getNameTamTai(1999));

    function checkTamTai(year)
    {
        let nameTamtai = getNameTamTai(year).split("; ");
        let nameYear = getNameYear(year).split(" ")[1];
        if(nameTamtai.includes(nameYear))
        {
            return "phạm vào";
        }
        return "không phạm";
    }

   // console.log("Tam tai: "+ checkTamTai(1999));

    function checkKimLau(age){
        let mod = age%9;
        if(mod==1 || mod ==3 || mod == 6 || mod == 8)
        {
            return "phạm vào";
        }
        return "không phạm";
    }


 //   console.log("kim lâu: " + checkKimLau(2022-1999+1));

    function checkHoangOc(age){
        if(dataHoangOc.includes(age.toString()))
        {
            return "phạm vào";
        }
        return "không phạm";
    }

//    console.log("kiem tra hoang oc" + checkHoangOc(22));

    function getNameYear(year) {
        return createYear(Number(year));
    }
    
    let validate = 0;

    $('.year').keyup(function () {
        if (validate) {
            if ($('.year').val() == '') {
                $('.validate').removeClass('d-none');
            } else if (Number($('.year').val()) < 1900 || Number($('.year').val()) > 2030) {
                $('.validate').removeClass('d-none');
                $('.validate').html('Mời bạn nhập năm sinh hợp lệ')
            } else {
                $('.validate').addClass('d-none');
            }
        }
    })

    function validation(year) {
        if (year == '') {
            $('.validate').removeClass('d-none');
        } else if (Number(year) < 1900 || Number(year) > 2030) {
            $('.validate').removeClass('d-none');
            $('.validate').html('Mời bạn nhập năm sinh hợp lệ')
        } else {
            $('.validate').addClass('d-none');
            return true;
        }
    }

    function resultOver(year, age)
    {
        if(checkKimLau(age)=="không phạm" && checkHoangOc(age) == "không phạm")
        {
            return "có thể";
        }
        return "không nên";

    }

    function findNextYearBuild(year,yearBuildCurrent)
    {
        console.log("function findNextYearBuild"+ year + " " + yearBuild);
        for(let i= Number(yearBuildCurrent)+1 ; i<=2072; i++)
        {
            if(checkKimLau(i-year+1) == "không phạm" && checkHoangOc(i-year+1) =="không phạm")
            {
                return i;
            }
        }
    }
   // console.log("Next year: " + findNextYearBuild(2000, 2026));


    function findListYearCanBuild(yearBuild)
    {
        let arr = "";
        for(let i = 1947; i<=Number(yearBuild)-10; i++ )
        {

            if(checkKimLau(Number(yearBuild)-i+1) == "không phạm" && checkHoangOc(Number(yearBuild)-i+1) == "không phạm")
            {
                arr += i + "; ";
            }
        }
        return arr;
    }

  //  console.log("List Year: " + findListYearCanBuild(2023));

    $('.btn-submit').click(function () {
        validate = 1;
        year = Number($('.year').val());
        if (!validation(year)) {
            $('.wrap-result').addClass('d-none')
            return;
        }
        let age = yearBuild-year+1;
       // console.log("age ="  + age);
        $('.wrap-result').removeClass('d-none')
        $(".output-year").html(year);
        $(".output-name-year").html(getNameYear(year));
        $(".plan-year").html(yearBuild);
        $(".name-tam-tai").html(getNameTamTai(year));
        $(".name-plan-year").html(getNameYear(yearBuild));
        $(".kq-tam-tai").html(checkTamTai(year));
        $(".age-furture").html(age.toString());
        $(".kq-kim-lau").html(checkKimLau(age));
        $(".kq-hoang-oc").html(checkHoangOc(age));
        $(".result-over").html(resultOver(year,age));
        if(resultOver(year,age)=="có thể")
        {
            $(".cant-build").addClass("d-none");
            $(".can-build").removeClass("d-none");
        }
        else{
            console.log("predict year: "+ findNextYearBuild(year, yearBuild));
            $(".predict-next-year").html(findNextYearBuild(year, yearBuild));
            $(".support-year").html(findListYearCanBuild(yearBuild));
            $(".can-build").addClass("d-none");
            $(".cant-build").removeClass("d-none");
        }
    })
})
