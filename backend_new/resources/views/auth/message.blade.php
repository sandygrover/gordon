@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ session('title') }}</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert <?php if(session('customMessage') && session('customMessage')) { echo 'alert-danger' ; } else { echo 'alert-success'; } ?>" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
