--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_table_access_method = heap;

--
-- Name: follow; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.follow CASCADE;
CREATE TABLE public.follow (
    usr_follow character varying(50) NOT NULL,
    usr_followed character varying(50) NOT NULL
);


--
-- Name: general_comment; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.general_comment CASCADE;
CREATE TABLE public.general_comment (
    cmt_id bigint NOT NULL,
    cmt_on bigint NOT NULL,
    cmt_by character varying(50) NOT NULL,
    text character varying(250) DEFAULT 'your comment'::character varying,
    cmt_time time without time zone DEFAULT now()
);


--
-- Name: general_comment_cmt_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.general_comment_cmt_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: general_comment_cmt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.general_comment_cmt_id_seq OWNED BY public.general_comment.cmt_id;


--
-- Name: general_comment_cmt_on_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.general_comment_cmt_on_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: general_comment_cmt_on_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.general_comment_cmt_on_seq OWNED BY public.general_comment.cmt_on;


--
-- Name: general_post; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.general_post CASCADE;
CREATE TABLE public.general_post (
    post_id bigint NOT NULL,
    author_username character varying(50) NOT NULL,
    date_post timestamp with time zone DEFAULT now(),
    img character varying(250) NOT NULL,
    text character varying(250)
);


--
-- Name: general_post_post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.general_post_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: general_post_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.general_post_post_id_seq OWNED BY public.general_post.post_id;


--
-- Name: group_info; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.group_info CASCADE;
CREATE TABLE public.group_info (
    group_id bigint NOT NULL,
    group_name character varying(100) NOT NULL,
    description character varying(250)
);


--
-- Name: group_info_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_info_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: group_info_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_info_group_id_seq OWNED BY public.group_info.group_id;


--
-- Name: group_member; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.group_member CASCADE;
CREATE TABLE public.group_member (
    group_id bigint NOT NULL,
    username character varying(50) NOT NULL,
    permission integer DEFAULT 0,
    blocked boolean DEFAULT false
);


--
-- Name: group_member_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_member_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: group_member_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_member_group_id_seq OWNED BY public.group_member.group_id;


--
-- Name: group_reported_member; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.group_reported_member CASCADE;
CREATE TABLE public.group_reported_member (
    report_id bigint NOT NULL,
    group_id bigint NOT NULL,
    member character varying(50) NOT NULL,
    reason character varying(250) DEFAULT 'toxic member'::character varying,
    username bigint
);


--
-- Name: group_reported_member_report_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_reported_member_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: group_reported_member_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_reported_member_report_id_seq OWNED BY public.group_reported_member.report_id;


--
-- Name: group_reported_post; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.group_reported_post CASCADE;
CREATE TABLE public.group_reported_post (
    report_id bigint NOT NULL,
    group_id bigint NOT NULL,
    post_id bigint NOT NULL,
    reason character varying(250) DEFAULT 'trash post'::character varying
);


--
-- Name: group_reported_post_report_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_reported_post_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: group_reported_post_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_reported_post_report_id_seq OWNED BY public.group_reported_post.report_id;


--
-- Name: group_wall; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.group_wall CASCADE;
CREATE TABLE public.group_wall (
    group_id bigint NOT NULL,
    post_id bigint NOT NULL
);


--
-- Name: group_wall_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_wall_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: group_wall_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_wall_group_id_seq OWNED BY public.group_wall.group_id;


--
-- Name: group_wall_post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.group_wall_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: group_wall_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.group_wall_post_id_seq OWNED BY public.group_wall.post_id;


--
-- Name: market_comment; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.market_comment CASCADE;
CREATE TABLE public.market_comment (
    cmt_id bigint NOT NULL,
    cmt_on bigint NOT NULL,
    cmt_by character varying(50) NOT NULL,
    cmt_time timestamp with time zone DEFAULT now(),
    text character varying(250) DEFAULT 'your comment'::character varying
);


--
-- Name: market_comment_cmt_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.market_comment_cmt_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: market_comment_cmt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.market_comment_cmt_id_seq OWNED BY public.market_comment.cmt_id;


--
-- Name: market_comment_cmt_on_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.market_comment_cmt_on_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: market_comment_cmt_on_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.market_comment_cmt_on_seq OWNED BY public.market_comment.cmt_on;


--
-- Name: market_post; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.market_post CASCADE;
CREATE TABLE public.market_post (
    post_id bigint NOT NULL,
    post_by character varying(50) NOT NULL,
    post_time timestamp with time zone DEFAULT now(),
    img character varying(250) DEFAULT './public/defaultItem.png'::character varying,
    text character varying(250) DEFAULT 'insert your caption'::character varying,
    price integer DEFAULT 0,
    title character varying(50) DEFAULT 'untitled'::character varying,
    tag text[]
);


--
-- Name: market_post_post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.market_post_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: market_post_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.market_post_post_id_seq OWNED BY public.market_post.post_id;


--
-- Name: reaction; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.reaction CASCADE;
CREATE TABLE public.reaction (
    react_on bigint NOT NULL,
    react_type integer DEFAULT 0,
    react_by character varying(50) NOT NULL
);


--
-- Name: reaction_react_on_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reaction_react_on_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reaction_react_on_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reaction_react_on_seq OWNED BY public.reaction.react_on;


--
-- Name: reported_group; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.reported_group CASCADE;
CREATE TABLE public.reported_group (
    report_id bigint NOT NULL,
    group_id bigint NOT NULL,
    reason character varying(250) DEFAULT 'toxic group'::character varying
);


--
-- Name: reported_group_report_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reported_group_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reported_group_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reported_group_report_id_seq OWNED BY public.reported_group.report_id;


--
-- Name: reported_post; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.reported_post CASCADE;
CREATE TABLE public.reported_post (
    report_id bigint NOT NULL,
    post_id bigint NOT NULL,
    reason character varying(250) DEFAULT 'trash post'::character varying
);


--
-- Name: reported_post_report_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reported_post_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reported_post_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reported_post_report_id_seq OWNED BY public.reported_post.report_id;


--
-- Name: reported_user; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.reported_user CASCADE;
CREATE TABLE public.reported_user (
    report_id bigint NOT NULL,
    reported_user character varying(50) NOT NULL,
    reason character varying(250) DEFAULT 'toxic user'::character varying
);


--
-- Name: reported_user_report_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reported_user_report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reported_user_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reported_user_report_id_seq OWNED BY public.reported_user.report_id;


--
-- Name: user_blocked; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.user_blocked CASCADE;
CREATE TABLE public.user_blocked (
    username character varying(50) NOT NULL,
    user_blocked character varying(50) NOT NULL
);


--
-- Name: user_info; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.user_info CASCADE;
CREATE TABLE public.user_info (
    username character varying(50) NOT NULL,
    pwd character varying(250) NOT NULL,
    permission integer DEFAULT 0,
    secret_key character varying(250) NOT NULL
);


--
-- Name: user_profile; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.user_profile CASCADE;
CREATE TABLE public.user_profile (
    username character varying(50) NOT NULL,
    fullname character varying(50) NOT NULL,
    email character varying(250),
    gender character varying(10),
    location character varying(250),
    about character varying(250),
    avatar character varying(300) DEFAULT 'default_avt.png'::character varying,
    dob date DEFAULT now()
);


--
-- Name: user_wall; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.user_wall CASCADE;
CREATE TABLE public.user_wall (
    username character varying(50) NOT NULL,
    post_id bigint NOT NULL
);


--
-- Name: user_wall_post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_wall_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_wall_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_wall_post_id_seq OWNED BY public.user_wall.post_id;


--
-- Name: general_comment cmt_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.general_comment ALTER COLUMN cmt_id SET DEFAULT nextval('public.general_comment_cmt_id_seq'::regclass);


--
-- Name: general_comment cmt_on; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.general_comment ALTER COLUMN cmt_on SET DEFAULT nextval('public.general_comment_cmt_on_seq'::regclass);


--
-- Name: general_post post_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.general_post ALTER COLUMN post_id SET DEFAULT nextval('public.general_post_post_id_seq'::regclass);


--
-- Name: group_info group_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_info ALTER COLUMN group_id SET DEFAULT nextval('public.group_info_group_id_seq'::regclass);


--
-- Name: group_member group_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_member ALTER COLUMN group_id SET DEFAULT nextval('public.group_member_group_id_seq'::regclass);


--
-- Name: group_reported_member report_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_reported_member ALTER COLUMN report_id SET DEFAULT nextval('public.group_reported_member_report_id_seq'::regclass);


--
-- Name: group_reported_post report_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_reported_post ALTER COLUMN report_id SET DEFAULT nextval('public.group_reported_post_report_id_seq'::regclass);


--
-- Name: group_wall group_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_wall ALTER COLUMN group_id SET DEFAULT nextval('public.group_wall_group_id_seq'::regclass);


--
-- Name: group_wall post_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_wall ALTER COLUMN post_id SET DEFAULT nextval('public.group_wall_post_id_seq'::regclass);


--
-- Name: market_comment cmt_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.market_comment ALTER COLUMN cmt_id SET DEFAULT nextval('public.market_comment_cmt_id_seq'::regclass);


--
-- Name: market_comment cmt_on; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.market_comment ALTER COLUMN cmt_on SET DEFAULT nextval('public.market_comment_cmt_on_seq'::regclass);


--
-- Name: market_post post_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.market_post ALTER COLUMN post_id SET DEFAULT nextval('public.market_post_post_id_seq'::regclass);


--
-- Name: reaction react_on; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reaction ALTER COLUMN react_on SET DEFAULT nextval('public.reaction_react_on_seq'::regclass);


--
-- Name: reported_group report_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_group ALTER COLUMN report_id SET DEFAULT nextval('public.reported_group_report_id_seq'::regclass);


--
-- Name: reported_post report_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_post ALTER COLUMN report_id SET DEFAULT nextval('public.reported_post_report_id_seq'::regclass);


--
-- Name: reported_user report_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_user ALTER COLUMN report_id SET DEFAULT nextval('public.reported_user_report_id_seq'::regclass);


--
-- Name: user_wall post_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_wall ALTER COLUMN post_id SET DEFAULT nextval('public.user_wall_post_id_seq'::regclass);


--
-- Name: follow follow_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY (usr_followed, usr_follow);


--
-- Name: general_comment general_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.general_comment
    ADD CONSTRAINT general_comment_pkey PRIMARY KEY (cmt_id);


--
-- Name: general_post general_post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.general_post
    ADD CONSTRAINT general_post_pkey PRIMARY KEY (post_id);


--
-- Name: group_info group_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_info
    ADD CONSTRAINT group_info_pkey PRIMARY KEY (group_id);


--
-- Name: group_member group_member_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_member
    ADD CONSTRAINT group_member_pkey PRIMARY KEY (group_id, username);


--
-- Name: group_reported_member group_reported_member_member_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_reported_member
    ADD CONSTRAINT group_reported_member_member_key UNIQUE (member);


--
-- Name: group_reported_member group_reported_member_member_key1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_reported_member
    ADD CONSTRAINT group_reported_member_member_key1 UNIQUE (member);


--
-- Name: group_reported_member group_reported_member_member_key2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_reported_member
    ADD CONSTRAINT group_reported_member_member_key2 UNIQUE (member);


--
-- Name: group_reported_member group_reported_member_member_key3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_reported_member
    ADD CONSTRAINT group_reported_member_member_key3 UNIQUE (member);


--
-- Name: group_reported_member group_reported_member_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_reported_member
    ADD CONSTRAINT group_reported_member_pkey PRIMARY KEY (report_id);


--
-- Name: group_reported_post group_reported_post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_reported_post
    ADD CONSTRAINT group_reported_post_pkey PRIMARY KEY (report_id);


--
-- Name: group_wall group_wall_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_wall
    ADD CONSTRAINT group_wall_pkey PRIMARY KEY (group_id, post_id);


--
-- Name: market_comment market_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.market_comment
    ADD CONSTRAINT market_comment_pkey PRIMARY KEY (cmt_id);


--
-- Name: market_post market_post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.market_post
    ADD CONSTRAINT market_post_pkey PRIMARY KEY (post_id);


--
-- Name: reaction reaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reaction
    ADD CONSTRAINT reaction_pkey PRIMARY KEY (react_on, react_by);


--
-- Name: reported_group reported_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_group
    ADD CONSTRAINT reported_group_pkey PRIMARY KEY (report_id);


--
-- Name: reported_post reported_post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_post
    ADD CONSTRAINT reported_post_pkey PRIMARY KEY (report_id);


--
-- Name: reported_user reported_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_user
    ADD CONSTRAINT reported_user_pkey PRIMARY KEY (report_id);


--
-- Name: user_blocked user_blocked_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_blocked
    ADD CONSTRAINT user_blocked_pkey PRIMARY KEY (username, user_blocked);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (username);


--
-- Name: user_profile user_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_pkey PRIMARY KEY (username);


--
-- Name: user_wall user_wall_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_wall
    ADD CONSTRAINT user_wall_pkey PRIMARY KEY (username, post_id);


--
-- Name: user_blocked fk_blocked_usr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_blocked
    ADD CONSTRAINT fk_blocked_usr FOREIGN KEY (user_blocked) REFERENCES public.user_profile(username) NOT VALID;


--
-- Name: user_blocked fk_blocking_usr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_blocked
    ADD CONSTRAINT fk_blocking_usr FOREIGN KEY (username) REFERENCES public.user_info(username) NOT VALID;


--
-- Name: follow fk_flwed_usr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT fk_flwed_usr FOREIGN KEY (usr_followed) REFERENCES public.user_profile(username) NOT VALID;


--
-- Name: follow fk_flwing_usr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT fk_flwing_usr FOREIGN KEY (usr_follow) REFERENCES public.user_profile(username) NOT VALID;


--
-- Name: group_member fk_gmem_group; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_member
    ADD CONSTRAINT fk_gmem_group FOREIGN KEY (group_id) REFERENCES public.group_info(group_id) NOT VALID;


--
-- Name: group_member fk_gmem_usr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_member
    ADD CONSTRAINT fk_gmem_usr FOREIGN KEY (username) REFERENCES public.user_profile(username) NOT VALID;


--
-- Name: group_wall fk_gwall_group; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_wall
    ADD CONSTRAINT fk_gwall_group FOREIGN KEY (group_id) REFERENCES public.group_info(group_id) NOT VALID;


--
-- Name: group_wall fk_gwall_post; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.group_wall
    ADD CONSTRAINT fk_gwall_post FOREIGN KEY (post_id) REFERENCES public.general_post(post_id) NOT VALID;


--
-- Name: reaction fk_rct_post; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reaction
    ADD CONSTRAINT fk_rct_post FOREIGN KEY (react_on) REFERENCES public.general_post(post_id) NOT VALID;


--
-- Name: reaction fk_rct_usr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reaction
    ADD CONSTRAINT fk_rct_usr FOREIGN KEY (react_by) REFERENCES public.user_profile(username) NOT VALID;


--
-- Name: user_wall fk_usrlib_post; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_wall
    ADD CONSTRAINT fk_usrlib_post FOREIGN KEY (post_id) REFERENCES public.general_post(post_id) NOT VALID;


--
-- Name: user_wall fk_usrlib_usr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_wall
    ADD CONSTRAINT fk_usrlib_usr FOREIGN KEY (username) REFERENCES public.user_info(username) NOT VALID;


--
-- Name: user_profile fk_usrprofile_usr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT fk_usrprofile_usr FOREIGN KEY (username) REFERENCES public.user_info(username) NOT VALID;


--
-- Name: general_comment general_comment_cmt_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.general_comment
    ADD CONSTRAINT general_comment_cmt_by_fkey FOREIGN KEY (cmt_by) REFERENCES public.user_profile(username) ON UPDATE CASCADE;


--
-- Name: general_comment general_comment_cmt_on_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.general_comment
    ADD CONSTRAINT general_comment_cmt_on_fkey FOREIGN KEY (cmt_on) REFERENCES public.general_post(post_id) ON UPDATE CASCADE;


--
-- Name: general_post general_post_author_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.general_post
    ADD CONSTRAINT general_post_author_username_fkey FOREIGN KEY (author_username) REFERENCES public.user_profile(username) ON UPDATE CASCADE;


--
-- Name: market_comment market_comment_cmt_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.market_comment
    ADD CONSTRAINT market_comment_cmt_by_fkey FOREIGN KEY (cmt_by) REFERENCES public.user_profile(username) ON UPDATE CASCADE;


--
-- Name: market_comment market_comment_cmt_on_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.market_comment
    ADD CONSTRAINT market_comment_cmt_on_fkey FOREIGN KEY (cmt_on) REFERENCES public.market_post(post_id) ON UPDATE CASCADE;


--
-- Name: market_post market_post_post_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.market_post
    ADD CONSTRAINT market_post_post_by_fkey FOREIGN KEY (post_by) REFERENCES public.user_profile(username) ON UPDATE CASCADE;


--
-- Name: reported_group reported_group_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_group
    ADD CONSTRAINT reported_group_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.group_info(group_id);


--
-- Name: reported_post reported_post_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_post
    ADD CONSTRAINT reported_post_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.general_post(post_id);


--
-- Name: reported_user reported_user_reported_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reported_user
    ADD CONSTRAINT reported_user_reported_user_fkey FOREIGN KEY (reported_user) REFERENCES public.user_info(username);


--
-- PostgreSQL database dump complete
--

