@extends('master')

@section('content')
    <style>
        .btn-group{
            width:100%!important;
        }
    </style>
    <div class="content">
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <h4 class="page-title"> {{ isset($contests) ? 'Edit ': 'Add ' }}Contest</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <form action="{{ isset($contests) ? URL::to('contests').'/'.$contests->id : URL::to('contests') }}" enctype="multipart/form-data" method="post" onsubmit="validateForm()">
                    @csrf
                    @if (isset($contests))
                        @method('put')
                    @endif
                    <div class="row">

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Contest Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control @error('contest_name') is-invalid @enderror" name="contest_name" value="{{ isset($contests) ? $contests->contest_name : ''}}" required autocomplete="contest_name" autofocus>

                                @error('contest_name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Stock Name <span class="text-danger">*</span></label>

                                <select class="form-control @error('stock_id') is-invalid @enderror" name="stock_id" value="{{ old('stock_id') }}" required autocomplete="order" autofocus>
                                    @foreach ($stockList as $value)
                                        <option {{ ( isset($contests) && ( $contests->stock_id == $value['id'] ) ) ? 'selected' : '' }} value="{{ $value['id'] }}">{{ $value['name'] }}</option>
                                    @endforeach
                                </select>

                                @error('stock_id')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Total Winning Amount <span class="text-danger">*</span></label>
                                <input type="number" class="form-control @error('total_winning_amount') is-invalid @enderror" name="total_winning_amount" value="{{ isset($contests) ? $contests->total_winning_amount : ''}}" required autocomplete="name" autofocus>

                                @error('total_winning_amount')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Contest Size <span class="text-danger">*</span></label>
                                <input type="number" class="form-control @error('contest_size') is-invalid @enderror" name="contest_size" value="{{ isset($contests) ? $contests->contest_size : ''}}" required autocomplete="name" autofocus>

                                @error('contest_size')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Entry Fees <span class="text-danger">*</span></label>
                                <input type="number" class="form-control @error('entry_fees') is-invalid @enderror" name="entry_fees" value="{{ isset($contests) ? $contests->entry_fees : ''}}" required autocomplete="name" autofocus>

                                @error('entry_fees')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>No Of Winners <span class="text-danger">*</span></label>
                                <input type="number" id="noOfWinners" class="form-control @error('no_of_winners') is-invalid @enderror" name="no_of_winners" value="{{ isset($contests) ? $contests->no_of_winners : ''}}" required autocomplete="name" autofocus>

                                @error('no_of_winners')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Contest Type <span class="text-danger">*</span></label>

                                <select class="form-control @error('contest_type') is-invalid @enderror" name="contest_type" value="{{ old('contest_type') }}" required autocomplete="order" autofocus>
                                    <option {{ isset($contests) ? ( $contests->contest_type == 1 ? 'selected' : '' ) : ''}} value="1">Paid</option>
                                    <option {{ isset($contests) ? ( $contests->contest_type == 0 ? 'selected' : '' ) : ''}} value="0">Free</option>
                                </select>

                                @error('contest_type')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Contest Category <span class="text-danger">*</span></label>

                                <select class="form-control @error('contest_category') is-invalid @enderror" name="contest_category" value="{{ old('contest_category') }}" required autocomplete="order" autofocus>
                                    @foreach ($contentCategories as $value)
                                        <option {{ isset($contests) ? ( $contests->contest_type == $value->id ? 'selected' : '' ) : ''}} value="{{ $value->id }}">{{ $value->name }}</option>
                                    @endforeach
                                </select>

                                @error('contest_category')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>


                        <div class="col-sm-6" id="contestData">
                            <div class="form-group">
                                <label>Contest Date</label>
                                <input type="date" min='{{ date('Y-m-d') }}' class="form-control" name="contest_date" required autocomplete="contest_date" value="{{ isset($contests) ? $contests->contest_date : '' }}" {{ isset($contests) ? ($contests->auto_create === 1 ? 'disabled' : '') : '' }}  autofocus/>

                                @error('contest_date')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror

                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="form-group">
                                <input value="1" type="checkbox" class="@error('is_confirm') is-invalid @enderror" name="is_confirm" autocomplete="name" autofocus {{ isset($contests) ? ( $contests->is_confirm == 1 ? 'checked' : '' ) : ''}}>

                                @error('is_confirm')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                                <label>Is Confirm</label>

                            </div>
                        </div>


                        <div class="col-sm-12">
                            <div class="form-group">
                                <input id="autoCreate" value="1" type="checkbox" class="@error('auto_create') is-invalid @enderror" name="auto_create" {{ isset($contests) ? ( $contests->auto_create == 1 ? 'checked' : '' ) : ''}} autocomplete="auto_create" autofocus>

                                @error('auto_create')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                                <label>Auto Create</label>

                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="form-group">
                                <input value="1" type="checkbox" class="@error('join_multiple') is-invalid @enderror" name="join_multiple" {{ isset($contests) ? ( $contests->join_multiple == 1 ? 'checked' : '' ) : ''}} autocomplete="join_multiple" autofocus>

                                @error('join_multiple')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                                <label>Join with multiple teams.</label>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <label>Price Distribution</label>
                            <table class="table" id="dynamic_field">
                                @if (isset($contests))
                                    @foreach (json_decode($contests->price_distribution) as $key => $value)
                                    <tr <?php if($key > 0) echo "id='row$key'"; ?>>
                                        <td><input type="number" name="from[]" placeholder="From" value="{{ ((array)$value)[0] }}" class="form-control pricing" readonly required/></td>
                                        <td><input type="number" name="to[]" placeholder="to" value="{{ ((array)$value)[1] }}" class="form-control pricing" required/></td>
                                        <td><input type="number" name="price[]" placeholder="Price" class="form-control priceField" onkeyup="priceFieldChange()" value="{{ ((array)$value)[2] }}" required/></td>
                                        @if ($key > 0)
                                        <td><button type="button" name="remove" id="{{ $key }}" class="btn btn-danger btn_remove">X</button></td>
                                        @else
                                        <td><button type="button" name="add" id="add" class="btn btn-primary">Add More</button></td>
                                        @endif
                                    </tr>
                                    @endforeach
                                @else
                                <tr>
                                    <td><input type="number" name="from[]" placeholder="From" value="1" class="form-control" readonly required/></td>
                                    <td><input type="number" name="to[]" placeholder="to" class="form-control" required/></td>
                                    <td><input type="number" name="price[]" placeholder="Price" class="form-control priceField" onkeyup="priceFieldChange()" required/></td>
                                    <td><button type="button" name="add" id="add" class="btn btn-primary">Add More</button></td>
                                </tr>
                                @endif
                            </table>
                            <div class="text-right m-t-20">
                                <h3>Total Price: <span id="total_price" class="text-success">0</span><h3>
                            </div>
                        </div>


                    </div>
                    <div class="m-t-20 text-center">
                        <button class="btn btn-primary submit-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        @if (isset($contests))
        priceFieldChange();
        @endif
        function priceFieldChange() {
            var ek = $('.priceField').map((_,el) => el.value).get();
            var fromArray = $('input[name="from[]"]').map((_,el) => el.value).get();
            var toArray = $('input[name="to[]"]').map((_,el) => el.value).get();
            var totalPrice = 0;
            ek.forEach((element, index) => {
                totalPrice = totalPrice + ( ( (parseInt(toArray[index]) - parseInt(fromArray[index])) + 1) * parseInt(element));
            });
            $('#total_price').html(totalPrice);
        }

        function validateForm() {
            return false;
        }

        $(document).ready(function() {
            $('#autoCreate').change(function() {
                if(this.checked) {
                    $('input[name="contest_date"]').attr('disabled', true);
                    $('input[name="contest_date"]').removeAttr('required');
                    $('input[name="contest_date"]').val('');
                } else {
                    $('input[name="contest_date"]').removeAttr('disabled');
                    $('input[name="contest_date"]').attr('required', true);
                    $('input[name="contest_date"]').val('');
                }
            });
        });

        $(document).ready(function(){
            var i = 1;
            $("#add").click(function(){
                let maxValue = $('#noOfWinners').val();
                i++;
                $('#dynamic_field').append('<tr id="row'+i+'"><td><input type="number" name="from[]" placeholder="From" class="form-control pricing"/></td><td><input type="number" name="to[]" placeholder="To" class="form-control pricing" max="'+maxValue+'" required/></td><td><input type="number" name="price[]" placeholder="Price" class="form-control priceField" onkeyup="priceFieldChange()" required/></td><td><button type="button" name="remove" id="'+i+'" class="btn btn-danger btn_remove">X</button></td></tr>');
            });

            $(document).on('click', '.btn_remove', function(){
                var button_id = $(this).attr("id");
                $('#row'+button_id+'').remove();
                priceFieldChange();
            });

            $('#noOfWinners').keyup(function () {
                $('.pricing').attr('max', $('#noOfWinners').val());
            });
        });
    </script>
@endpush
